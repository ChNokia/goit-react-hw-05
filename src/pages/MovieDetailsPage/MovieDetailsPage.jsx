import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import styles from './MovieDetailsPage.module.css';

import { getMovieDetailsById } from '../../services/api';

import { RotatingLines } from 'react-loader-spinner';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location?.state ?? '/movies');

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getMovieDetails = async () => {
      const data = await getMovieDetailsById(movieId);
      setMovieDetails(data);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return (
      <div>
        <RotatingLines strokeColor="#e1dff1" height="60" width="60" />;
      </div>
    );
  }

  const {
    poster_path,
    original_title,
    overview,
    vote_average,
    vote_count,
    genres,
    origin_country,
    original_language,
    release_date,
    spoken_languages,
  } = movieDetails;

  return (
    <div className={styles.detailsDiv}>
      <Link to={goBackUrl.current}>Go Back</Link>
      <div className={styles.posterDiv}>
        <img
          className={styles.posterImg}
          width={250}
          height={350}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster'
          }
          alt={original_title}
        />
        <div className={styles.descriptionDiv}>
          <h2 className={styles.title}>{original_title}</h2>
          <div className={styles.ratingDiv}>
            <p className={styles.rating}>
              {vote_average}/10{' '}
              <span className={styles.ratingSpan}>(Votes: {vote_count})</span>
            </p>
          </div>
          <div className={styles.overviewInfo}>
            <p>
              <span className={styles.overviewInfoSpan}>Genres: </span>
              {genres.map(item => item.name).join(', ')}
            </p>
            <p>
              <span className={styles.overviewInfoSpan}>Country: </span>
              {origin_country.map(item => item).join(', ')}
            </p>
            <p>
              <span className={styles.overviewInfoSpan}>Language: </span>
              {original_language}
            </p>
            <p>
              <span className={styles.overviewInfoSpan}>Translations: </span>
              {spoken_languages.map(item => item.english_name).join(', ')}
            </p>
            <p>
              <span className={styles.overviewInfoSpan}>Year: </span>
              {release_date}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.overview}>
        <p>{overview || "We don't have description."}</p>
      </div>
      <div className={styles.infoLinkDiv}>
        <NavLink to="cast" className={styles.infoLink}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={styles.infoLink}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
