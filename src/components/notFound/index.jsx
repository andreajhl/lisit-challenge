import { useRouteError } from 'react-router-dom';
import wordings from '../../wordings';
import Layout from '../layout';
import CardEmpty from '../ui/cardEmpty';

const NotFound = () => {
  const { notFound } = wordings;
  const { response } = useRouteError();

  return (
    <Layout>
      <CardEmpty
        link='/'
        {...notFound}
        code={response?.status || 404}
      />
    </Layout>
  );
};


export default NotFound;