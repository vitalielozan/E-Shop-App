import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import App from './App.jsx'
import AppProviders from './components/AppProviders.jsx'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </HeroUIProvider>
  </React.StrictMode>
)
