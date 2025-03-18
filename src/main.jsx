import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';

import App from './App.jsx'

import './assets/styles/index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </StrictMode>
  </BrowserRouter>
)
