import { useEffect, useState } from 'react';

import MovieList from '../components/MovieList/MovieList';

import { fetchTrendingMovies } from '../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data.results);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
