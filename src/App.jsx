/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { getAllLaunches } from './services/launches';
const launches = await getAllLaunches()
*/
import { Fragment } from 'react';
import { Route, Routes }  from 'react-router-dom';
//import { createBrowserRouter}  from 'react-router-dom';
import { LaunchAllList } from './components/LaunchAllList';
import { LaunchItemDetails } from './components/LaunchItemDetails';
import { LaunchRocketDetails } from './components/LaunchRocketDetails';
import { About } from './components/About';

import ErrorPage from './routes/error-page';
import { NavBar } from './components/NavBar';

export function App() {
/*
  const routerList = createBrowserRouter([
      {
        path: "/",
        element: <LaunchAllList />,
        errorElement: <ErrorPage />,
      },
    ]);
  
  const routerMissionDetails = createBrowserRouter([
      {
        path: "launch/:launchId",
        element: <LaunchItemDetails />,
        errorElement: <ErrorPage />,
      },
    ]);
*/
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

