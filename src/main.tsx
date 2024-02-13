import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './Providers'

import App from './App.tsx'

import './index.css'

globalThis.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
