import React from 'react'
import ReactDOM from 'react-dom/client'
/*
import Papelillo from './App.jsx'
import { BrowerRouter } from "react-router-dom";
*/

import { ChakraProvider } from '@chakra-ui/react';
import Papelillo from './App.jsx'

const rootElement = document.getElementById('root');

/*v1

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Papelillo />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
*/

/*v2*/

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
        <Papelillo />
    </ChakraProvider>
  </React.StrictMode>,
)



