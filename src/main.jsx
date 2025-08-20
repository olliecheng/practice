import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'

import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/bricolage-grotesque';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen text-gray-800">
      <Home />
    </div>
  </StrictMode>,
)