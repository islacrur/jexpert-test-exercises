import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App 
      title="Adivina el Número" 
      initialCount={5} 
    />
  </StrictMode>,
)
