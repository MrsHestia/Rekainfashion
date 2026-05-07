import React from 'react'
import ReactDOM from 'react-dom/client'
import RekainStore from './rekain-store.jsx'
import './index.css'

// Client Key Midtrans Anda
const CLIENT_KEY = 'Mid-client-8gPYQxOju-oG9sej'

// URL Midtrans Snap (sandbox untuk testing)
const MIDTRANS_SCRIPT_URL = 'https://api.sandbox.midtrans.com/v2/assets/js/snap.js'

// Fungsi untuk memuat script Midtrans
const loadMidtransScript = () => {
  return new Promise((resolve) => {
    // Cek apakah script sudah ada
    if (document.getElementById('midtrans-snap-script')) {
      resolve(true)
      return
    }
    
    // Buat script baru
    const script = document.createElement('script')
    script.id = 'midtrans-snap-script'
    script.src = MIDTRANS_SCRIPT_URL
    script.setAttribute('data-client-key', CLIENT_KEY)
    
    script.onload = () => {
      console.log('Midtrans Snap loaded successfully')
      resolve(true)
    }
    
    script.onerror = () => {
      console.error('Failed to load Midtrans Snap')
      resolve(false)
    }
    
    document.body.appendChild(script)
  })
}

// Root element
const rootElement = document.getElementById('root')

// Load Midtrans dulu, baru render aplikasi
loadMidtransScript().then(() => {
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RekainStore />
      </React.StrictMode>
    )
  } else {
    console.error('Element dengan id "root" tidak ditemukan')
  }
})
