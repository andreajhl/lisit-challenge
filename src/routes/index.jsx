import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/home';
import Layout from '../components/layout';
import NotFound from '../components/notFound';
import Category from '../components/category';
import CategoryDetail from '../components/categoryDetail';
import {
  filmsLoader,
  peopleLoader,
  planetsLoader,
  categoryLoader,
  starshipsLoader,
  categoriesLoader,
} from './loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: categoriesLoader,
      },
      {
        path: 'category',
        children: [
          {
            path: 'people/:id',
            element: <CategoryDetail />,
            loader: peopleLoader,
          },
          {
            path: 'planets/:id',
            element: <CategoryDetail />,
            loader: planetsLoader,
          },
          {
            path: 'starships/:id',
            element: <CategoryDetail />,
            loader: starshipsLoader,
          },
          {
            path: 'films/:id',
            element: <CategoryDetail />,
            loader: filmsLoader,
          },
          {
            path: ':category',
            element: <Category />,
            loader: categoryLoader,
          }
        ]
      },
    ],
  },
]);