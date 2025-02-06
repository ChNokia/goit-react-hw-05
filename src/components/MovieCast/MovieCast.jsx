import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

import { getMoviCredits } from '../../services/api';

import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        const data = await getMoviCredits(movieId);
        console.log(data);

        setCast(data.cast);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);
  return (
    <div>
      {isLoading && <TailSpin radius={'8px'} height="30" width="30" />}
      {!isLoading && cast.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )}
      {cast.length > 0 && (
        <ul className={styles.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li className={styles.castDiv} key={id}>
              <div className={styles.actorImgDiv}>
                <img
                  className={styles.actorImg}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+photo'
                  }
                  alt="avatar"
                  width="150"
                />
              </div>
              <div className={styles.actorDiv}>
                <p className={styles.actorName}>{name ?? ''}</p>
                <p className={styles.characterName}>{character ?? ''}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
