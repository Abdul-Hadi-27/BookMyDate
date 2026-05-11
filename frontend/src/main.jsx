import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <Provider store={store}>

    <App />
  </Provider>
    <ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover={false}
  draggable
  theme="dark"
   toastClassName={() =>
    "bg-black text-white rounded shadow-lg px-4 py-3"
  }
  bodyClassName={() => "text-white"}
  progressClassName="bg-red-500"
/>

  </BrowserRouter>
)
