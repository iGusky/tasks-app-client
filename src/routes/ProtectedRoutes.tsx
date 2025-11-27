import Layout from '@/layout/Layout';
import { useAuth } from '@/providers/authProvider'
import { Text } from '@mantine/core';
import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router';

export const ProtectedRoutes = () => {
  const { checkAuth, isAuth } = useAuth();

  // const validateToken = async () => {
  //   if (await checkAuth) {
  //     return (
  //       <Layout>
  //         <Outlet />
  //       </Layout>
  //     )
  //   }
  //   return <Navigate to="/auth/login" />
  // }

  // useEffect(() => {
  //   validateToken()
  // }, [])

  return <Text>{isAuth}</Text>

}