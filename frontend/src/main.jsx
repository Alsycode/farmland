// path: src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';


// in src/main.jsx - wrap AuthProvider children with ToastProvider
import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
  
        <BrowserRouter>
            <AuthProvider>
          <App />
          </AuthProvider>
        </BrowserRouter>
   
    </ToastProvider>
  </React.StrictMode>
);
