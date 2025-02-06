import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import MovieListComponent from '../../components/MovieComponent/MovieListComponent';

import styles from './HomePage.module.css';

import { fetchTrendingMovies } from '../../services/api';

const notify = (message = 'Something was wrong') => toast.error(`${message}`);

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies(currentPage);
        console.log(data);
        setMovies(prev => [...prev, ...data.results]);
        setIsLoadMoreVisible(currentPage < data.total_pages);
      } catch (error) {
        notify(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [currentPage]);

  const handleMoreBtn = () => {
    setCurrentPage(prev => ++prev);
  };
  return (
    <div className={styles.homePageDiv}>
      <h1>Trending today</h1>
      {/* ?????????? trace */}
      <MovieListComponent
        movieList={movies}
        isLoading={isLoading}
        isLoadMoreVisible={isLoadMoreVisible}
        onLoadMore={handleMoreBtn}
      />
    </div>
  );
};

export default HomePage;
