import { Link } from 'react-router-dom';
import './styles.scss';

const CardEmpty = ({ title, message, code, retry, url }) => ((
  <main className='error-boundary'>
    <div className='error-boundary__content'>
      <h1 className='error-boundary__content-title'>{title}</h1>
      <div className='error-boundary__content-message'>
        {
          code && (
            <p className='error-boundary__content-message-code'>
              {code}
            </p>
          )
        }
        <p className='error-boundary__content-message-text'>{message}</p>
      </div>
      <div className='error-boundary__content-retry'>
        <Link to={url} reloadDocument className='error-boundary__content-retry-link'>
          {retry} &rarr;
        </Link>
      </div>
    </div>
  </main>
))

export default CardEmpty;
