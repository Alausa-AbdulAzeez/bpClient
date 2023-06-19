import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
)
