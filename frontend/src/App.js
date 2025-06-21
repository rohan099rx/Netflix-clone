import React, { useState } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  ContentRow, 
  TrailerModal, 
  useNetflixData 
} from './components';

function App() {
  const { movies, featuredMovie, loading } = useNetflixData();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handlePlayTrailer = (movie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // In a real app, this would filter the movies
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Netflix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App bg-black min-h-screen">
      <Header onSearch={handleSearch} />
      
      <main>
        <HeroSection 
          featuredContent={featuredMovie} 
          onPlayTrailer={handlePlayTrailer} 
        />
        
        <div className="relative z-10 -mt-32 space-y-8">
          <ContentRow
            title="Trending Now"
            movies={movies.trending}
            onPlayTrailer={handlePlayTrailer}
          />
          
          <ContentRow
            title="Popular on Netflix"
            movies={movies.popular}
            onPlayTrailer={handlePlayTrailer}
          />
          
          <ContentRow
            title="Top Rated"
            movies={movies.topRated}
            onPlayTrailer={handlePlayTrailer}
          />
          
          <ContentRow
            title="Coming Soon"
            movies={movies.upcoming}
            onPlayTrailer={handlePlayTrailer}
          />
        </div>
      </main>

      <TrailerModal
        movie={selectedMovie}
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
      />

      <footer className="bg-black/90 text-gray-400 py-16 px-4 md:px-16 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Account</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 Netflix Clone. This is a demo project for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;