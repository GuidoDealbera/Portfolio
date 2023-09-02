import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster duration={3500} expand={true} position='bottom-left' closeButton/>
    <App />
  </React.StrictMode>,
)
