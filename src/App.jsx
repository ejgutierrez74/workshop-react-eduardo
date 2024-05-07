/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { getAllLaunches } from './services/launches';
const launches = await getAllLaunches()
*/
import { Fragment } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
//import { createBrowserRouter}  from 'react-router-dom';
import { LaunchAllList } from './components/LaunchAllList';
import { LaunchItemDetails } from './components/LaunchItemDetails';
import { LaunchRocketDetails } from './components/LaunchRocketDetails';
import { About } from './components/About';

import ErrorPage from './routes/error-page';
import { NavBar } from './components/NavBar';

/*Version1 con Routes y Navbar 
export function App() {

  return (
    <Fragment>
      <NavBar/>
      <Routes>
          <Route path='/' element={<LaunchAllList />} />
          <Route path='/about' element={<About />} />
          <Route path='/missions' element={<LaunchAllList />} />
          <Route path='launches/:launchId' element={<LaunchItemDetails />} />
          <Route path='rockets/:rocketId' element={<LaunchRocketDetails />} />
          <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );

}
export default App
*/

/*Version2 con createBrowseRouter y RouteProvider. Version recomendada por React Router para 6.4 y posteriores */
//Donde va Outlet es donce los hijos incrustan su elemento ej: si elijo about, me mostrara NavBar y About.
//Tengo que añadir el hijo tambien / para que ademas del navbar me aparezca todo el listado de misiones. Si dejaba solo el headerlayout solo me mostraba el navbar

const HeaderLayout = () => (
  <Fragment>
    <NavBar />
    <Outlet />
  </Fragment>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <LaunchAllList />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/missions",
      element: <LaunchAllList />,
    },
    {
      path: "/launches/:launchId",
      element: <LaunchItemDetails />,
    }, {
      path: "/rockets/:rocketId",
      element: <LaunchRocketDetails />,
    },
    {
      path: "*",
      element: <LaunchItemDetails />,
    },

    ]
  }
])


export function App() {

  return <RouterProvider router={router} />;

}

export default App