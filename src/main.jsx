import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store.js'
import { Provider } from 'react-redux'
import Ref from './context/Ref.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter  basename="/QuikNote">
    <Provider store={store}>
      <Ref>
        <App />
      </Ref>
      <Toaster/>
    </Provider>
  </BrowserRouter>,
)
