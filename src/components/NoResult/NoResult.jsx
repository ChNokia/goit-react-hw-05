import styles from './NoResult.module.css';

const NoResult = () => {
  return (
    <div className={styles.noResultsDiv}>
      <p className={styles.noResultsTitle}>
        No movies were found to match your search
      </p>
      <p className={styles.noResultsMessage}>
        Try modifying your search criteria or creating a new query.
      </p>
    </div>
  );
};

export default NoResult;
