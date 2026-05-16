import React from 'react'
import ReactDOM from 'react-dom/client'
import RekainStore from './rekain-store.jsx'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RekainStore />
    </React.StrictMode>
  )
} else {
  console.error('Element dengan id "root" tidak ditemukan')
}
