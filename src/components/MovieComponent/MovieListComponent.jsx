import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import MovieList from '../MovieList/MovieList';
import NoResult from '../NoResult/NoResult';

import styles from './MovieListComponent.module.css';

const MovieListComponent = ({
  movieList,
  isLoading,
  isLoadMoreVisible,
  onLoadMore,
  isEmptyList,
}) => {
  const handleMoreBtn = () => {
    onLoadMore();
  };

  return (
    <div className={styles.movieComponentDiv}>
      {movieList.length > 0 && <MovieList movies={movieList} />}
      {isEmptyList && <NoResult />}
      {isLoading && <Loader />}
      {isLoadMoreVisible && <LoadMoreBtn clickAction={handleMoreBtn} />}
    </div>
  );
};

export default MovieListComponent;
