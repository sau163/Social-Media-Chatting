
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import store from './redux/store'; // Ensure this line is added
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>
);
