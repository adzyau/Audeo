import React, { useState, useEffect } from 'react';
import spotifyAPI from './spotify-api';

const SpotifyAuth = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (spotifyAPI.isAuthenticated()) {
      setIsAuthenticated(true);
      loadUserProfile();
    }

    // Handle callback from Spotify
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');

    if (code) {
      handleAuthCallback(code);
    } else if (errorParam) {
      setError('Authorization was denied');
    }
  }, []);

  const handleAuthCallback = async (code) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await spotifyAPI.getAccessToken(code);
      if (success) {
        setIsAuthenticated(true);
        await loadUserProfile();
        onAuthSuccess && onAuthSuccess();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        setError('Failed to authenticate with Spotify');
      }
    } catch (err) {
      setError('Authentication error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const profile = await spotifyAPI.getUserProfile();
      if (profile) {
        setUserProfile(profile);
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);
    window.location.href = spotifyAPI.getAuthUrl();
  };

  const handleLogout = () => {
    spotifyAPI.logout();
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-audeo-orange"></div>
        <span className="ml-3 text-white">Connecting to Spotify...</span>
      </div>
    );
  }

  if (isAuthenticated && userProfile) {
    return (
      <div className="flex items-center justify-between p-4 bg-audeo-gray rounded-lg">
        <div className="flex items-center space-x-3">
          {userProfile.images && userProfile.images[0] && (
            <img
              src={userProfile.images[0].url}
              alt={userProfile.display_name}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="text-white font-semibold">{userProfile.display_name}</p>
            <p className="text-gray-400 text-sm">Connected to Spotify</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-audeo-gray rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Connect to Spotify</h3>
      <p className="text-gray-400 mb-6">
        Connect your Spotify account to access your real playlists, recently played tracks, and more.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-audeo-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-audeo-orange-hover transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Connecting...' : 'Connect with Spotify'}
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        This will redirect you to Spotify's secure login page. Your login credentials are never stored by Audeo.
      </p>
    </div>
  );
};

export default SpotifyAuth;