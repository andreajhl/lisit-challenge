import { Link, useParams } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import Search from '../ui/search';
import wordings from '../../wordings';
import './styles.scss';

const Navbar = () => {
  const { navbar: { title, placeholder } } = wordings;
  const { setQuery } = useQueryParams();
  const { category, id } = useParams();

  const handleSubmit = (value) => setQuery({ search: value });

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__brand'>
        <img
          alt='brand'
          src='/images/brand.png'
          className='navbar__brand-img'
        />
        <p className='navbar__brand-title'>{title}</p>
      </Link>
      {(category && !id) && (
        <Search
          placeholder={`${placeholder} ${category}`}
          handleSubmit={handleSubmit}
        />
      )}
    </nav>
  );
};

export default Navbar;
