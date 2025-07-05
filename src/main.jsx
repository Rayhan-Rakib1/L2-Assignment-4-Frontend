import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import { RouterProvider } from 'react-router-dom'
import router from './routers/routes.js'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './components/theme-provider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router}>
          <App></App>
        </RouterProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
