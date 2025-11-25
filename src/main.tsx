import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import { MantineProvider } from "@mantine/core"
import SignUp from './pages/auth/SignUp.tsx'
import Home from './pages/home/Home.tsx'
import Layout from './layout/Layout.tsx'

import '@/styles/index.css'
import '@mantine/core/styles.css';
import theme from './styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth/sign-up' element={<SignUp />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  </MantineProvider>
)
