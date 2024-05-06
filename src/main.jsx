import React from 'react'
import ReactDOM from 'react-dom/client'
import Papelillo from './App.jsx'
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');

/* V1 Sin router creado*/

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Papelillo />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)


/*Version2 con createBrowseRouter y RouteProvider. No se ve el itemDetails 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Papelillo />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />   
    </ChakraProvider>
  </React.StrictMode>,
)
*/