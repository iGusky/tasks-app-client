import Layout from '@/layout/Layout'
import { useAuth } from '@/providers/authProvider'
import { Text } from '@mantine/core'
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoutes = () => {
  const { isAuth, checkingAuth } = useAuth()

  if (isAuth && !checkingAuth)
    return (
      <Layout>
        <Outlet />
      </Layout>
    )
  if (!isAuth && !checkingAuth) return <Navigate to={'/auth/login'} />
  return <Text>{checkingAuth ? 'true' : 'false'}</Text>
}
