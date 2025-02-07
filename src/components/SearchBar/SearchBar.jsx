import { GoSearch } from 'react-icons/go';
import { Toaster, toast } from 'react-hot-toast';

import styles from './SearchBar.module.css';
import { useState } from 'react';

const notify = (message = 'Empty query!') => toast.error(message);

const SearchBar = ({ queryString, handleSearch }) => {
  const [query, setQuery] = useState(() => queryString || '');

  const handleSubmit = event => {
    event.preventDefault();

    const newQuery = event.target.elements.search.value.trim();
    if (!newQuery) {
      notify();
      return;
    }
    handleSearch(newQuery);
  };

  return (
    <header className={styles.searchHeader}>
      <Toaster />
      <form className={styles.searchField} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          autoFocus
          placeholder="Input movie's name"
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
