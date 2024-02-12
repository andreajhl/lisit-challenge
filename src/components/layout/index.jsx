import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';
import './styles.scss';

const Layout = ({ children }) => (
  <Fragment>
    <header className='layout-header'>
      <Navbar />
    </header>
    <main className='layout-main'>
      <Outlet />
      {children}
    </main>
  </Fragment>   
);

export default Layout;