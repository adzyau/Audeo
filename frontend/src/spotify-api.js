// Spotify API Integration Service for Audeo
class SpotifyAPI {
  constructor() {
    this.clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    this.redirectUri = window.location.origin + '/callback';
    this.scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-library-read'
    ];
    this.accessToken = null;
    this.refreshToken = null;
  }

  // Generate authorization URL
  getAuthUrl() {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scopes.join(' '),
      redirect_uri: this.redirectUri,
      show_dialog: 'true'
    });
    
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async getAccessToken(code) {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error getting access token:', error);
      return false;
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('spotify_refresh_token');
    }

    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        this.accessToken = data.access_token;
        localStorage.setItem('spotify_access_token', data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return false;
    }
  }

  // Make authenticated API requests
  async apiRequest(endpoint, options = {}) {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('spotify_access_token');
    }

    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const url = `https://api.spotify.com/v1${endpoint}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
          return await fetch(url, config);
        } else {
          throw new Error('Authentication failed');
        }
      }
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile() {
    try {
      const response = await this.apiRequest('/me');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Get user's playlists
  async getUserPlaylists(limit = 20) {
    try {
      const response = await this.apiRequest(`/me/playlists?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      return null;
    }
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 20) {
    try {
      const response = await this.apiRequest(`/me/player/recently-played?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching recently played:', error);
      return null;
    }
  }

  // Get user's top tracks
  async getTopTracks(timeRange = 'medium_term', limit = 20) {
    try {
      const response = await this.apiRequest(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return null;
    }
  }

  // Get user's top artists
  async getTopArtists(timeRange = 'medium_term', limit = 20) {
    try {
      const response = await this.apiRequest(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching top artists:', error);
      return null;
    }
  }

  // Search for tracks, artists, albums, etc.
  async search(query, types = ['track'], limit = 20) {
    try {
      const typeString = types.join(',');
      const response = await this.apiRequest(`/search?q=${encodeURIComponent(query)}&type=${typeString}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching:', error);
      return null;
    }
  }

  // Get current playback state
  async getCurrentPlayback() {
    try {
      const response = await this.apiRequest('/me/player');
      if (response.status === 204) {
        return null; // No active playback
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current playback:', error);
      return null;
    }
  }

  // Control playback
  async play(deviceId = null, contextUri = null, uris = null) {
    try {
      const body = {};
      if (contextUri) body.context_uri = contextUri;
      if (uris) body.uris = uris;
      
      const endpoint = deviceId ? `/me/player/play?device_id=${deviceId}` : '/me/player/play';
      const response = await this.apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body)
      });
      return response.ok;
    } catch (error) {
      console.error('Error playing track:', error);
      return false;
    }
  }

  async pause() {
    try {
      const response = await this.apiRequest('/me/player/pause', {
        method: 'PUT'
      });
      return response.ok;
    } catch (error) {
      console.error('Error pausing playback:', error);
      return false;
    }
  }

  async next() {
    try {
      const response = await this.apiRequest('/me/player/next', {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Error skipping to next track:', error);
      return false;
    }
  }

  async previous() {
    try {
      const response = await this.apiRequest('/me/player/previous', {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Error going to previous track:', error);
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.accessToken || !!localStorage.getItem('spotify_access_token');
  }

  // Clear authentication
  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
  }
}

// Export singleton instance
export const spotifyAPI = new SpotifyAPI();
export default spotifyAPI;