import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Sidebar, 
  Player, 
  HomeView, 
  SearchView, 
  LibraryView, 
  mockData 
} from './components';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(mockData.currentTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            recentlyPlayed={mockData.recentlyPlayed}
            featuredPlaylists={mockData.featuredPlaylists}
            topArtists={mockData.topArtists}
            setCurrentView={setCurrentView}
          />
        );
      case 'search':
        return (
          <SearchView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={mockData.searchResults}
          />
        );
      case 'library':
        return (
          <LibraryView
            recentlyPlayed={mockData.recentlyPlayed}
            setCurrentView={setCurrentView}
          />
        );
      case 'playlist':
        return (
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              <img
                src={currentPlaylist?.image || mockData.recentlyPlayed[0].image}
                alt={currentPlaylist?.name || "Playlist"}
                className="w-60 h-60 rounded-lg object-cover shadow-2xl"
              />
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">PLAYLIST</p>
                <h1 className="text-white text-6xl font-bold mb-4">
                  {currentPlaylist?.name || "Liked Songs"}
                </h1>
                <p className="text-gray-400 mb-4">
                  {currentPlaylist?.description || "Your favorite songs collected in one place"}
                </p>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <span>Spotify</span>
                  <span>•</span>
                  <span>50 songs</span>
                  <span>•</span>
                  <span>3 hr 2 min</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-orange-500 text-white p-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14.72a.5.5 0 0 0 .8.4l11-7.36a.5.5 0 0 0 0-.8L8.8 4.74a.5.5 0 0 0-.8.4z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.96 3.115c-2.717 0-4.915 2.198-4.915 4.915 0 6.981 8.915 12.97 8.915 12.97s8.915-5.989 8.915-12.97c0-2.717-2.198-4.915-4.915-4.915-1.613 0-3.04.785-3.96 1.98A4.845 4.845 0 0 0 8.96 3.115z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-medium border-b border-gray-800 pb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">TITLE</div>
                <div className="col-span-3">ALBUM</div>
                <div className="col-span-2">DATE ADDED</div>
                <div className="col-span-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
              </div>
              {mockData.searchResults.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-gray-800 group transition-colors duration-200"
                >
                  <div className="col-span-1">
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <button className="hidden group-hover:block text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v14.72a.5.5 0 0 0 .8.4l11-7.36a.5.5 0 0 0 0-.8L8.8 4.74a.5.5 0 0 0-.8.4z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="col-span-5 flex items-center space-x-3">
                    <img
                      src={track.image}
                      alt={track.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">{track.name}</p>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-gray-400 text-sm">{track.album}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">Dec 15, 2023</p>
                  </div>
                  <div className="col-span-1">
                    <span className="text-gray-400 text-sm">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'artist':
        return (
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              <img
                src={mockData.topArtists[0].image}
                alt={mockData.topArtists[0].name}
                className="w-60 h-60 rounded-full object-cover shadow-2xl"
              />
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">ARTIST</p>
                <h1 className="text-white text-6xl font-bold mb-4">
                  {mockData.topArtists[0].name}
                </h1>
                <p className="text-gray-400 mb-4">
                  {mockData.topArtists[0].followers} monthly listeners
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-orange-500 text-white p-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14.72a.5.5 0 0 0 .8.4l11-7.36a.5.5 0 0 0 0-.8L8.8 4.74a.5.5 0 0 0-.8.4z"/>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.96 3.115c-2.717 0-4.915 2.198-4.915 4.915 0 6.981 8.915 12.97 8.915 12.97s8.915-5.989 8.915-12.97c0-2.717-2.198-4.915-4.915-4.915-1.613 0-3.04.785-3.96 1.98A4.845 4.845 0 0 0 8.96 3.115z"/>
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold mb-4">Popular</h2>
              <div className="space-y-2">
                {mockData.searchResults.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 group transition-colors duration-200"
                  >
                    <span className="text-gray-400 w-4 text-sm">{index + 1}</span>
                    <img
                      src={track.image}
                      alt={track.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{track.name}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-black text-white flex">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        recentlyPlayed={mockData.recentlyPlayed}
        setCurrentPlaylist={setCurrentPlaylist}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('home')}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              Upgrade
            </button>
            <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black pb-24">
          {renderMainContent()}
        </div>
      </div>
      
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
