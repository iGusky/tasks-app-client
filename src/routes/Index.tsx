import { Login } from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import Home from '@/pages/home/Home'
import { Tasks } from '@/pages/tasks/Tasks'
import { useAuth } from '@/providers/authProvider'
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router'
import { ProtectedRoutes } from './ProtectedRoutes'

const Routes = () => {
  const { isAuth } = useAuth()

  const publicRoutes: RouteObject[] = []

  const nonAuthRoutes: RouteObject[] = [
    {
      path: '/auth/login',
      element: <Login />,
    },
    {
      path: '/auth/signup',
      element: <SignUp />,
    },
  ]

  const privateRoutes: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/tasks',
          element: <Tasks />,
        },
      ],
    },
  ]

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!isAuth ? nonAuthRoutes : []),
    ...privateRoutes,
  ])

  return <RouterProvider router={router} />
}

export default Routes
