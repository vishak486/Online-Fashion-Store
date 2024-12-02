import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.min.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CategoryContext from './contexts/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CategoryContext>
  </StrictMode>,
)
