import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Loading from './components/loading';

const App = () => (
  <RouterProvider
    router={router}
    fallbackElement={<Loading />}
  />
);

export default App;
