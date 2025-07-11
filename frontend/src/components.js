import React, { useState, useEffect, useRef } from 'react';

// Icons Component
const Icons = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z"/>
    </svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="m16.618 17.032-3.676-3.676a7.5 7.5 0 1 1-1.414-1.414l3.676 3.676a1 1 0 0 1 0 1.414z"/>
      <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Library: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1.5.866l8-9a1 1 0 0 0 0-1.732l-8-9z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1z"/>
    </svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.96 3.115c-2.717 0-4.915 2.198-4.915 4.915 0 6.981 8.915 12.97 8.915 12.97s8.915-5.989 8.915-12.97c0-2.717-2.198-4.915-4.915-4.915-1.613 0-3.04.785-3.96 1.98A4.845 4.845 0 0 0 8.96 3.115z"/>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14.72a.5.5 0 0 0 .8.4l11-7.36a.5.5 0 0 0 0-.8L8.8 4.74a.5.5 0 0 0-.8.4z"/>
    </svg>
  ),
  Pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  ),
  Previous: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4a1 1 0 0 1 2 0v5.5L18.5 4.668a1 1 0 0 1 1.5.866v12.932a1 1 0 0 1-1.5.866L9 14.5V20a1 1 0 1 1-2 0V4z"/>
    </svg>
  ),
  Next: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 4a1 1 0 0 0-2 0v5.5L5.5 4.668a1 1 0 0 0-1.5.866v12.932a1 1 0 0 0 1.5.866L15 14.5V20a1 1 0 1 0 2 0V4z"/>
    </svg>
  ),
  Shuffle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 4h-.79l-1.78 2.44L16.5 8l4-5.5h-3zm0 16h-.79l-1.78-2.44L16.5 16l4 5.5h-3zm-15-8 1.5 2.25L5.5 12l-1.5-2.25L2.5 12zm7.5-8v3.17L8.5 5.5 10 4zm0 16v-3.17L8.5 18.5 10 20z"/>
    </svg>
  ),
  Repeat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 17H7a5 5 0 0 1 0-10h8v2l4-3-4-3v2H7a7 7 0 0 0 0 14h10v-2z"/>
    </svg>
  ),
  Volume: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.741.85a.8.8 0 0 1 .375.65v20.485a.8.8 0 0 1-1.301.62L3.27 18.16H.8a.8.8 0 0 1-.8-.8V6.64a.8.8 0 0 1 .8-.8h2.47L8.815 1.395A.8.8 0 0 1 9.741.85z"/>
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  Clock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  )
};

// Mock Data
const mockData = {
  recentlyPlayed: [
    {
      id: 1,
      name: "Liked Songs",
      type: "playlist",
      image: "https://images.unsplash.com/photo-1551596210-4da509bd1e99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibHVlfDE3NTIyNTMxMjF8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 2,
      name: "Discover Weekly",
      type: "playlist",
      image: "https://images.pexels.com/photos/7676248/pexels-photo-7676248.jpeg"
    },
    {
      id: 3,
      name: "Release Radar",
      type: "playlist",
      image: "https://images.pexels.com/photos/18240516/pexels-photo-18240516.jpeg"
    },
    {
      id: 4,
      name: "Daily Mix 1",
      type: "playlist",
      image: "https://images.pexels.com/photos/14016239/pexels-photo-14016239.png"
    },
    {
      id: 5,
      name: "Chill Hits",
      type: "playlist",
      image: "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 6,
      name: "Rock Classics",
      type: "playlist",
      image: "https://images.unsplash.com/photo-1577648865668-652597f573af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85"
    }
  ],
  featuredPlaylists: [
    {
      id: 7,
      name: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      image: "https://images.unsplash.com/flagged/photo-1572482810910-9ff68908fcf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 8,
      name: "RapCaviar",
      description: "New music from Drake, Travis Scott and more",
      image: "https://images.pexels.com/photos/7915879/pexels-photo-7915879.jpeg"
    },
    {
      id: 9,
      name: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      image: "https://images.pexels.com/photos/7277960/pexels-photo-7277960.jpeg"
    },
    {
      id: 10,
      name: "Rock This",
      description: "Rock legends & epic songs that continue to inspire",
      image: "https://images.pexels.com/photos/7279111/pexels-photo-7279111.jpeg"
    },
    {
      id: 11,
      name: "Peaceful Piano",
      description: "Relax and indulge with beautiful piano pieces",
      image: "https://images.unsplash.com/photo-1579791237963-790a2d836a08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibHVlfDE3NTIyNTMxMjF8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 12,
      name: "Deep Focus",
      description: "Keep calm and focus with ambient and post-rock music",
      image: "https://images.unsplash.com/photo-1718615310715-6e1f7213ce49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibHVlfDE3NTIyNTMxMjF8MA&ixlib=rb-4.1.0&q=85"
    }
  ],
  currentTrack: {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    image: "https://images.unsplash.com/photo-1551596210-4da509bd1e99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibHVlfDE3NTIyNTMxMjF8MA&ixlib=rb-4.1.0&q=85",
    duration: 200,
    isPlaying: false
  },
  searchResults: [
    {
      id: 1,
      type: "track",
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      image: "https://images.unsplash.com/photo-1551596210-4da509bd1e99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHxibHVlfDE3NTIyNTMxMjF8MA&ixlib=rb-4.1.0&q=85",
      duration: "3:20"
    },
    {
      id: 2,
      type: "track",
      name: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      image: "https://images.pexels.com/photos/7676248/pexels-photo-7676248.jpeg",
      duration: "2:54"
    },
    {
      id: 3,
      type: "track",
      name: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      image: "https://images.pexels.com/photos/18240516/pexels-photo-18240516.jpeg",
      duration: "3:23"
    }
  ],
  topArtists: [
    {
      id: 1,
      name: "The Weeknd",
      image: "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85",
      followers: "85,123,456"
    },
    {
      id: 2,
      name: "Harry Styles",
      image: "https://images.unsplash.com/photo-1577648865668-652597f573af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85",
      followers: "72,456,789"
    },
    {
      id: 3,
      name: "Dua Lipa",
      image: "https://images.unsplash.com/flagged/photo-1572482810910-9ff68908fcf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFydGlzdHxlbnwwfHx8Ymx1ZXwxNzUyMjUzMTI4fDA&ixlib=rb-4.1.0&q=85",
      followers: "63,789,012"
    }
  ]
};

// Navigation Component
export const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Icons.Home },
    { id: 'search', label: 'Search', icon: Icons.Search },
    { id: 'library', label: 'Your Library', icon: Icons.Library }
  ];

  return (
    <nav className="flex flex-col space-y-4">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentView === item.id
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <item.icon />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// Playlist Item Component
export const PlaylistItem = ({ playlist, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
  >
    <img
      src={playlist.image}
      alt={playlist.name}
      className="w-12 h-12 rounded-lg object-cover"
    />
    <div className="flex-1 min-w-0">
      <p className="text-white font-medium truncate">{playlist.name}</p>
      <p className="text-gray-400 text-sm truncate capitalize">{playlist.type}</p>
    </div>
  </div>
);

// Card Component
export const Card = ({ item, onClick, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-40',
    medium: 'w-48',
    large: 'w-56'
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-200 cursor-pointer group`}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <button className="absolute bottom-2 right-2 bg-audeo-orange text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-105 hover:bg-audeo-orange-hover">
          <Icons.Play />
        </button>
      </div>
      <h3 className="text-white font-semibold mb-2 truncate">{item.name}</h3>
      <p className="text-gray-400 text-sm line-clamp-2">{item.description || `${item.type} • ${item.artist || 'Various artists'}`}</p>
    </div>
  );
};

// Search Component
export const SearchView = ({ searchQuery, setSearchQuery, searchResults }) => (
  <div className="p-6">
    <div className="mb-6">
      <div className="relative">
        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>

    {searchQuery ? (
      <div className="space-y-6">
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Songs</h2>
          <div className="space-y-2">
            {searchResults.map((track) => (
              <div
                key={track.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              >
                <img
                  src={track.image}
                  alt={track.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{track.name}</p>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
                <span className="text-gray-400 text-sm">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="space-y-6">
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Podcasts', 'Made for you', 'Charts', 'New releases', 'Discover', 'Concerts', 'Hip-Hop', 'Rock'].map((category) => (
              <div
                key={category}
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 h-24 flex items-end cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <h3 className="text-white font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

// Library Component
export const LibraryView = ({ recentlyPlayed, setCurrentView }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-white text-2xl font-bold">Your Library</h1>
      <button className="text-gray-400 hover:text-white">
        <Icons.Plus />
      </button>
    </div>

    <div className="flex space-x-4 mb-6">
      {['Recently played', 'Made for you', 'Artists', 'Albums'].map((filter) => (
        <button
          key={filter}
          className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm hover:bg-gray-700 transition-colors duration-200"
        >
          {filter}
        </button>
      ))}
    </div>

    <div className="space-y-2">
      {recentlyPlayed.map((item) => (
        <PlaylistItem
          key={item.id}
          playlist={item}
          onClick={() => setCurrentView('playlist')}
        />
      ))}
    </div>
  </div>
);

// Home Component
export const HomeView = ({ recentlyPlayed, featuredPlaylists, topArtists, setCurrentView }) => (
  <div className="p-6 space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-white text-3xl font-bold">Good evening</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentlyPlayed.slice(0, 6).map((item) => (
        <div
          key={item.id}
          onClick={() => setCurrentView('playlist')}
          className="flex items-center bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer group"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-l-lg object-cover"
          />
          <div className="flex-1 px-4">
            <p className="text-white font-semibold">{item.name}</p>
          </div>
          <button className="p-2 mr-4 bg-orange-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Icons.Play />
          </button>
        </div>
      ))}
    </div>

    <div>
      <h2 className="text-white text-xl font-semibold mb-4">Made for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {featuredPlaylists.slice(0, 5).map((playlist) => (
          <Card
            key={playlist.id}
            item={playlist}
            onClick={() => setCurrentView('playlist')}
          />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-white text-xl font-semibold mb-4">Recently played</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recentlyPlayed.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={() => setCurrentView('playlist')}
          />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-white text-xl font-semibold mb-4">Popular artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topArtists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => setCurrentView('artist')}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full aspect-square object-cover rounded-full mb-4"
              />
              <button className="absolute bottom-2 right-2 bg-orange-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-105">
                <Icons.Play />
              </button>
            </div>
            <h3 className="text-white font-semibold text-center">{artist.name}</h3>
            <p className="text-gray-400 text-sm text-center">Artist</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Player Component
export const Player = ({ currentTrack, isPlaying, setIsPlaying }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, all, one

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev < currentTrack.duration ? prev + 1 : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack.duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-white font-medium truncate">{currentTrack.name}</p>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <Icons.Heart />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors duration-200 ${
                isShuffle ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icons.Shuffle />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Icons.Previous />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform duration-200"
            >
              {isPlaying ? <Icons.Pause /> : <Icons.Play />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <Icons.Next />
            </button>
            <button
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
              className={`transition-colors duration-200 ${
                repeatMode !== 'off' ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icons.Repeat />
            </button>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-600 h-1 rounded-full">
              <div
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume and More */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button className="text-gray-400 hover:text-white">
            <Icons.Volume />
          </button>
          <div className="w-24 bg-gray-600 h-1 rounded-full">
            <div
              className="bg-orange-500 h-1 rounded-full"
              style={{ width: `${volume}%` }}
            />
          </div>
          <button className="text-gray-400 hover:text-white">
            <Icons.MoreHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
export const Sidebar = ({ currentView, setCurrentView, recentlyPlayed, setCurrentPlaylist }) => (
  <div className="w-64 bg-black h-full flex flex-col">
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-8">Audeo</h1>
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>

    <div className="flex-1 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-400 text-sm font-medium">PLAYLISTS</h2>
        <button className="text-gray-400 hover:text-white">
          <Icons.Plus />
        </button>
      </div>
      <div className="space-y-2">
        {recentlyPlayed.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            onClick={() => {
              setCurrentView('playlist');
              setCurrentPlaylist(playlist);
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export { mockData, Icons };