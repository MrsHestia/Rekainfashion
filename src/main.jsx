import React from 'react'
import ReactDOM from 'react-dom/client'
import RekainStore from './rekain-store.jsx' // Menambahkan ekstensi .jsx agar lebih pasti
import './index.css'

// Pastikan element dengan id 'root' ada di index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RekainStore />
    </React.StrictMode>,
  )
} else {
  console.error("Elemen root tidak ditemukan! Pastikan index.html memiliki <div id='root'></div>");
}
