import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Context from './Components/ContextProvider/Context';
import Login from './Components/Login';
import AppContextProvider from './contextApi/ContextProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <HashRouter>
      <AppContextProvider>
      <div className='main-wrapper'>
      <ToastContainer position="top-center" />
        <App />
      </div>
        </AppContextProvider>
    </HashRouter>
   </Context>


);


