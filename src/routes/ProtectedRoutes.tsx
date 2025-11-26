import Layout from '@/layout/Layout';
import { useAuth } from '@/providers/authProvider'

import { Navigate, Outlet } from 'react-router';

export const ProtectedRoutes = () => {
    const {token} = useAuth();

    if(!token){
        return <Navigate to="/auth/login"/>
    }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}