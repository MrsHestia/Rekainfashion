// Ubah dari RekainStore menjadi RekainFashion agar sesuai dengan isi filenya
import RekainFashion from './rekain-store.jsx' 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RekainFashion />
    </React.StrictMode>,
  )
}
