import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.min.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CategoryContext from './contexts/CategoryContext.jsx'
import AuthContext from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthContext>
        <CategoryContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CategoryContext>
      </AuthContext>
  </StrictMode>,
)
