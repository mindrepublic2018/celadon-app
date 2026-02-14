import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CeladonApp from './CeladonApp.jsx'
import AdminApp from './AdminApp.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CeladonApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
