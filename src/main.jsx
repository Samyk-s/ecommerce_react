import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './config/routing'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Routing/>
  </StrictMode>,
)