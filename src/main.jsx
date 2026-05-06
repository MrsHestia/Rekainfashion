import React from 'react'
import ReactDOM from 'react-dom/client'
import RekainStore from './rekain-store' // Pastikan nama filenya benar
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RekainStore />
  </React.StrictMode>,
)
