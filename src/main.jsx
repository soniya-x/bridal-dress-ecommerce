import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
  
    <App />
     </Provider>
    </ChakraProvider>
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored" />
  </BrowserRouter>,
)
