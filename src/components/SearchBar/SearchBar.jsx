import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { Toaster, toast } from 'react-hot-toast';

import styles from './SearchBar.module.css';

const notify = (message = 'Empty query!') => toast.error(message);

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const newQuery = event.target.elements.search.value.trim();
    if (!newQuery) {
      notify();
      return;
    }
    onSubmit(newQuery);
    event.target.reset();
  };
  return (
    <header className={styles.searchHeader}>
      <Toaster />
      <form className={styles.searchField} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button className={styles.searchBtn} type="submit">
          <GoSearch size="24" />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
