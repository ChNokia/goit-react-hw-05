import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Comment } from 'react-loader-spinner';

import { getMovieReviews } from '../../services/api';

import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);
        console.log(data.results);

        setReviews(data.results);
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
      {isLoading && <Comment />}
      {!isLoading && reviews.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )}
      {reviews.length > 0 && (
        <ul className={styles.reviewList}>
          {reviews.map(({ id, author_details, content, created_at }) => (
            <li className={styles.reviewDiv} key={id}>
              <div className={styles.reviewAuthorDiv}>
                <img
                  className={styles.authorAvatar}
                  src={
                    author_details?.avatar_path
                      ? `https://image.tmdb.org/t/p/w500${author_details.avatar_path}`
                      : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+avatar'
                  }
                  alt="avatar"
                  width="32"
                />
                <div className={styles.authorDiv}>
                  <p className={styles.authorUserName}>
                    {author_details?.username ?? ''}
                  </p>
                  <p className={styles.authorName}>
                    {author_details?.name ?? ''}
                  </p>
                </div>
              </div>
              <p className={styles.date}>{created_at}</p>
              <p className={styles.content}>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
