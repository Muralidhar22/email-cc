import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('email-list');
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  // </React.StrictMode>,
)
