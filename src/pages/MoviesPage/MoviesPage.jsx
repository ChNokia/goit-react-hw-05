import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import MovieListComponent from '../../components/MovieComponent/MovieListComponent';
import SearchBar from '../../components/SearchBar/SearchBar';

import { searchMoviesByQuery } from '../../services/api';

import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

const notify = (message = 'Something was wrong') => toast.error(`${message}`);

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  useEffect(() => {
    setCurrentPage(+(searchParams?.get('currentPage') ?? 1));
    setQuery(searchParams?.get('query') ?? '');
  }, [searchParams]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getQueryMovies = async () => {
      try {
        setIsLoading(true);
        const data = await searchMoviesByQuery(query, { page: currentPage });
        console.log(data);

        setSearchMovies(prev => [...prev, ...data.results]);
        setIsLoadMoreVisible(currentPage < data.total_pages);
      } catch (error) {
        notify(error);
      } finally {
        setIsLoading(false);
      }
    };

    getQueryMovies();
  }, [query, currentPage]);

  const handleSearch = newQuery => {
    setSearchMovies([]);
    searchParams.set('currentPage', 1);
    searchParams.set('query', newQuery);
    setSearchParams(searchParams);
  };

  const handleMoreBtn = () => {
    searchParams.set('currentPage', currentPage + 1);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.moviePageDiv}>
      <SearchBar onSubmit={handleSearch} />
      <MovieListComponent
        movieList={searchMovies}
        isLoading={isLoading}
        isLoadMoreVisible={isLoadMoreVisible}
        onLoadMore={handleMoreBtn}
      />
    </div>
  );
};

export default MoviesPage;
