import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import ErrorPage from './error-page.tsx'
import './index.css'

const routes: RouteObject[] = [{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage/>
}]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
