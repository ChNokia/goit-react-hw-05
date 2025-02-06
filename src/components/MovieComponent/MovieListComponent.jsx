import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import MovieList from '../MovieList/MovieList';

import styles from './MovieListComponent.module.css';

const MovieListComponent = ({
  movieList,
  isLoading,
  isLoadMoreVisible,
  onLoadMore,
}) => {
  const handleMoreBtn = () => {
    onLoadMore();
  };

  return (
    <div className={styles.movieComponentDiv}>
      {movieList.length > 0 && <MovieList movies={movieList} />}
      {/* add if searchMovies is empty */}
      {isLoading && <Loader />}
      {isLoadMoreVisible && <LoadMoreBtn clickAction={handleMoreBtn} />}
    </div>
  );
};

export default MovieListComponent;
