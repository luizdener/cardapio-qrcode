import React from 'react'
import ReactDOM from 'react-dom/client'

// importação de bibliotecas
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// importação das rotas
import Home from './routes/Home.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Cart from './routes/Cart.jsx'

// importação de estilização
import './styles/globals.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/cart',
    element: <Cart/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
