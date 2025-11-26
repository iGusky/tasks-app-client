import AuthProvider from '@/providers/authProvider.tsx'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { MantineProvider } from "@mantine/core"
import Routes from "./routes/Index.tsx"

import '@/styles/index.css'
import '@mantine/core/styles.css';
import theme from '@/styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <Toaster richColors position="bottom-right" />
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </MantineProvider>
)
