import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import { Toaster } from 'sonner'

import SignUp from './pages/auth/SignUp.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <Toaster richColors position="top-center" />
    <div className='max-width-full p-4 min-w-lvw min-h-lvh bg-slate-100'>
      <Routes>
        <Route path='/auth/sign-up' element={<SignUp />}/>
      </Routes>
    </div>
  </BrowserRouter>,
)
