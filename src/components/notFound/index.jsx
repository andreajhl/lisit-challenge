
import { Link, useRouteError } from 'react-router-dom';
import wordings from '../../wordings';
import Layout from '../layout';
import './styles.scss';

const NotFound = () => {
  const { notFound } = wordings;
  const { response } = useRouteError();

  return (
    <Layout>
      <main className='error-boundary'>
        <div className='error-boundary__content'>
          <h1 className='error-boundary__content-title'>{notFound.title}</h1>
          <div className='error-boundary__content-message'>
            <p className='error-boundary__content-message-code'>
              {response.status || 404}
            </p>
            <p className='error-boundary__content-message-text'>{notFound.message}</p>
          </div>
          <div className='error-boundary__content-retry'>
            <Link to='/' className='error-boundary__content-retry-link'>
              {notFound.retry} &rarr;
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};


export default NotFound;