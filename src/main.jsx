import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { ClientsProvider } from './context/ClientsContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClientsProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ClientsProvider>
    </BrowserRouter>
  </StrictMode>,
)