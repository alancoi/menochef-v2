import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminApp from './pages/AdminApp'
import './index.css'

const isAdmin = window.location.pathname === '/admin';
const AppComponent = isAdmin ? AdminApp : App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
)
