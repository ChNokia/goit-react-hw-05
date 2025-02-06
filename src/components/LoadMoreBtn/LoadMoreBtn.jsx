import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ clickAction }) => {
  return (
    <button onClick={clickAction} className={styles.loadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
