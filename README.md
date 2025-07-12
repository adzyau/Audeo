# 🎵 Audeo - Music Streaming Platform

A beautiful, feature-rich music streaming application inspired by Spotify, built with React and integrated with the Spotify Web API.

![Audeo Screenshot](https://via.placeholder.com/800x400/FF6600/ffffff?text=Audeo+Music+Streaming+Platform)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark Theme**: Sleek black and gray interface with orange accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Professional Layout**: Card-based design with intuitive navigation

### 🎵 **Core Functionality**
- **Multi-page Navigation**: Home, Search, Library, Playlist, and Artist views
- **Music Player**: Bottom player bar with full playback controls
- **Playlist Management**: Browse and interact with playlists
- **Search**: Find tracks, artists, albums, and playlists
- **Recently Played**: Track listening history
- **Top Charts**: Popular tracks and artists

### 🔗 **Spotify Integration**
- **OAuth Authentication**: Secure login with Spotify accounts
- **Real Data**: Access user's actual Spotify library and playlists
- **Playback Control**: Play, pause, skip, and volume control
- **User Profile**: Display connected user information
- **Live Search**: Search Spotify's entire music catalog

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Spotify Developer Account
- Spotify Premium (for playback control)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd audeo
```

2. **Install dependencies**
```bash
cd frontend
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_BACKEND_URL=your-backend-url
REACT_APP_SPOTIFY_CLIENT_ID=your-spotify-client-id
REACT_APP_SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
WDS_SOCKET_PORT=443
```

4. **Start the development server**
```bash
yarn start
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Spotify API Setup

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Note your Client ID and Client Secret

2. **Configure Redirect URIs**
   - In your Spotify app settings, add:
   - `http://localhost:3000/callback` (for development)
   - `https://yourdomain.com/callback` (for production)

3. **Set Required Scopes**
   The app uses these Spotify scopes:
   - `user-read-private` - Access user profile
   - `user-read-email` - Access user email
   - `user-read-playback-state` - Read playback state
   - `user-modify-playback-state` - Control playback
   - `user-read-currently-playing` - Read current track
   - `streaming` - Play music in the browser
   - `user-read-recently-played` - Access listening history
   - `user-top-read` - Access top tracks and artists
   - `playlist-read-private` - Access private playlists
   - `playlist-read-collaborative` - Access collaborative playlists
   - `user-library-read` - Access saved music

## 🎯 Usage

### Authentication
1. Click "Connect with Spotify" on the home page
2. You'll be redirected to Spotify's login page
3. Grant permissions to Audeo
4. You'll be redirected back with access to your music

### Navigation
- **Home**: Recently played and featured playlists
- **Search**: Find any track, artist, or album
- **Your Library**: Your saved playlists and music
- **Playlists**: Detailed view of any playlist
- **Artists**: Artist profiles with top tracks

### Playback Control
- **Play/Pause**: Click any play button or use the bottom player
- **Skip**: Next/previous track controls
- **Volume**: Adjust volume with the slider
- **Shuffle/Repeat**: Toggle playback modes

## 🛠️ Technical Details

### Architecture
- **Frontend**: React 19+ with modern hooks
- **Styling**: TailwindCSS with custom theme
- **API**: Spotify Web API integration
- **Authentication**: OAuth 2.0 with PKCE flow
- **State Management**: React Context and local state

### Key Components
- **App.js**: Main application component
- **components.js**: All UI components (Navigation, Player, Views)
- **spotify-api.js**: Spotify API service class
- **SpotifyAuth.js**: Authentication component

### Custom Theming
```css
/* Brand Colors */
--audeo-orange: #FF6600;
--audeo-orange-hover: #e55a00;
--audeo-gray: #3E424B;
```

## 🎨 Customization

### Color Scheme
The app uses a custom color palette defined in:
- `tailwind.config.js` - TailwindCSS custom colors
- `App.css` - Additional CSS custom properties

### Adding New Features
1. **New API Endpoints**: Add methods to `spotify-api.js`
2. **New Components**: Add to `components.js`
3. **New Routes**: Update the routing in `App.js`

## 🔒 Security

- **Environment Variables**: API credentials are stored securely
- **OAuth Flow**: Secure authentication with Spotify
- **Token Management**: Automatic token refresh
- **No Credential Storage**: User credentials never stored locally

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface

## 🐛 Troubleshooting

### Common Issues

**Authentication Problems**
- Ensure redirect URIs are correctly configured
- Check that your app is not in development mode restrictions
- Verify client ID and secret are correct

**Playback Issues**
- Requires Spotify Premium subscription
- Need an active Spotify device
- Check browser supports Web Playback SDK

**API Limits**
- Spotify has rate limits on API calls
- The app implements automatic retry logic
- Heavy usage may require optimization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

- **Spotify**: For providing the excellent Web API
- **React**: For the robust frontend framework
- **TailwindCSS**: For the utility-first CSS framework
- **Lucide React**: For beautiful icons

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by the Audeo team**

*Transform your music experience with Audeo - where great music meets beautiful design.*
