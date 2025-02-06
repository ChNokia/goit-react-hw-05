import { Link, useLocation } from 'react-router-dom';

import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map(
        ({ poster_path, release_date, original_title, vote_average, id }) => (
          <li className={styles.movieCard} key={id}>
            <Link to={`/movies/${id}`} state={location}>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster'
                }
                width={300}
                alt={original_title}
              />
              <div className={styles.movieInfo}>
                <h2>{original_title}</h2>
                <p>Release Date: {release_date}</p>
                <p>Vote Average: {vote_average}</p>
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default MovieList;
