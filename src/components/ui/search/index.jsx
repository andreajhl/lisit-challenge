import { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useDebounce } from '../../../hooks/debounce';
import { normalizeText } from '../../../utils/strings';
import './styles.scss';

const INTERVAL_TIME = 1000;

const Search = ({ placeholder, handleSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(normalizeText(target.value));
  };

  const automaticSearch = () => {
    if (search.length) {
      handleSubmit(search);
      setSearch('');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(search);
    setSearch('');
  };

  const debouncedRedirect = useDebounce(automaticSearch, INTERVAL_TIME);
  useEffect(() => { search.length && debouncedRedirect() }, [search]);

  return (
    <div className='search'>
      <form
        onSubmit={onSubmit}
        className='search__form-control'
      >
        <input
          value={search}
          onChange={handleChange}
          aria-label={placeholder}
          placeholder={placeholder}
          className='search__form-control-input'
        />
        <button className='search__form-control-btn' type='submit'>
          <PiMagnifyingGlassBold />
        </button>
      </form>
    </div>
  );
};

export default Search;
