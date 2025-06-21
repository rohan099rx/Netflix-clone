import React, { useState, useEffect } from 'react';
import axios from 'axios';

// TMDB API Configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// Mock data for fallback
const mockMovies = [
  {
    id: 1,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    backdrop_path: "https://images.pexels.com/photos/7563612/pexels-photo-7563612.jpeg",
    poster_path: "https://images.pexels.com/photos/15357883/pexels-photo-15357883.jpeg",
    vote_average: 8.7,
    genre_ids: [18, 9648, 878]
  },
  {
    id: 2,
    title: "The Witcher",
    overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    backdrop_path: "https://images.pexels.com/photos/7563609/pexels-photo-7563609.jpeg",
    poster_path: "https://images.unsplash.com/photo-1542911945-39ed8c8bc9cd",
    vote_average: 8.2,
    genre_ids: [10759, 18, 9648]
  },
  {
    id: 3,
    title: "Money Heist",
    overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    backdrop_path: "https://images.unsplash.com/photo-1636008007951-a70d957cfe55",
    poster_path: "https://images.pexels.com/photos/6136097/pexels-photo-6136097.jpeg",
    vote_average: 8.3,
    genre_ids: [80, 18]
  },
  {
    id: 4,
    title: "Squid Game",
    overview: "A mysterious invitation to join the game is sent out to people at risk who are in dire need of money. 456 participants from all walks of life are locked into a secret location.",
    backdrop_path: "https://images.pexels.com/photos/7564231/pexels-photo-7564231.jpeg",
    poster_path: "https://images.pexels.com/photos/8793880/pexels-photo-8793880.jpeg",
    vote_average: 8.0,
    genre_ids: [18, 53]
  },
  {
    id: 5,
    title: "Wednesday",
    overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
    backdrop_path: "https://images.unsplash.com/photo-1637806631554-bcfe2c618058",
    poster_path: "https://images.pexels.com/photos/6136091/pexels-photo-6136091.jpeg",
    vote_average: 8.5,
    genre_ids: [35, 80, 9648]
  }
];

// Header Component
export const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <span className="text-red-600 text-2xl md:text-3xl font-bold">NETFLIX</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-white">
            <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-black/50 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-white transition-colors"
            />
          </form>
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = ({ featuredContent, onPlayTrailer }) => {
  if (!featuredContent) return null;

  return (
    <div className="relative h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={featuredContent.backdrop_path}
          alt={featuredContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 px-4 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {featuredContent.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
          {featuredContent.overview}
        </p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => onPlayTrailer(featuredContent)}
            className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-white/80 transition-colors font-semibold"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition-colors font-semibold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Movie Card Component
export const MovieCard = ({ movie, onPlayTrailer, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative min-w-0 flex-shrink-0 w-48 md:w-64 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover && onHover(movie);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlayTrailer(movie)}
    >
      <div className="relative">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-72 md:h-96 object-cover rounded"
          loading="lazy"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center">
            <div className="text-center text-white p-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-green-500">★</span>
                <span>{movie.vote_average}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, movies, onPlayTrailer }) => {
  const scrollContainer = React.useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-16">
        {title}
      </h2>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div
          ref={scrollContainer}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-16 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Trailer Modal Component
export const TrailerModal = ({ movie, isOpen, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      fetchTrailer();
    }
  }, [isOpen, movie]);

  const fetchTrailer = async () => {
    if (!movie) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      );
      
      const youtubeTrailer = response.data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      
      if (youtubeTrailer) {
        setTrailerKey(youtubeTrailer.key);
      } else {
        // Fallback trailer keys for demo
        const demoTrailers = ['dQw4w9WgXcQ', 'M7lc1UVf-VE', 'kqzvaIyoOJY'];
        setTrailerKey(demoTrailers[Math.floor(Math.random() * demoTrailers.length)]);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      // Fallback trailer for demo
      setTrailerKey('dQw4w9WgXcQ');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-white text-xl font-semibold">{movie?.title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="aspect-video bg-black">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie?.title} Trailer`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Trailer not available</p>
            </div>
          )}
        </div>
        
        {movie && (
          <div className="p-4 text-white">
            <p className="text-gray-300 mb-4">{movie.overview}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <span className="text-green-500">★</span>
                <span>{movie.vote_average}</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">2023</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Netflix Component Hook
export const useNetflixData = () => {
  const [movies, setMovies] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: []
  });
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      // Try to fetch real data first
      const [trendingRes, popularRes, topRatedRes, upcomingRes] = await Promise.allSettled([
        axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
        axios.get(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`)
      ]);

      const processResponse = (result) => {
        if (result.status === 'fulfilled') {
          return result.value.data.results.map(movie => ({
            ...movie,
            poster_path: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : mockMovies[Math.floor(Math.random() * mockMovies.length)].poster_path,
            backdrop_path: movie.backdrop_path ? `${TMDB_IMAGE_ORIGINAL}${movie.backdrop_path}` : mockMovies[Math.floor(Math.random() * mockMovies.length)].backdrop_path
          }));
        }
        return mockMovies;
      };

      const movieData = {
        trending: processResponse(trendingRes),
        popular: processResponse(popularRes),
        topRated: processResponse(topRatedRes),
        upcoming: processResponse(upcomingRes)
      };

      setMovies(movieData);
      setFeaturedMovie(movieData.trending[0] || mockMovies[0]);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      // Use mock data as fallback
      setMovies({
        trending: mockMovies,
        popular: [...mockMovies].reverse(),
        topRated: [...mockMovies].sort(() => Math.random() - 0.5),
        upcoming: [...mockMovies].sort(() => Math.random() - 0.5)
      });
      setFeaturedMovie(mockMovies[0]);
    }
    setLoading(false);
  };

  return { movies, featuredMovie, loading };
};