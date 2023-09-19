import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import App from './App.tsx'
import ErrorPage from './error-page.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient()

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
