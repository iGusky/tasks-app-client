import { Button, LoadingOverlay, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { Link, redirect, useNavigate } from 'react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from '@/lib/axios'
import { useAuth } from '@/providers/authProvider'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const { setIsAuth } = useAuth()

  const schema = z.object({
    email: z.email('Ingresa un email válido'),
    password: z.string('Ingresa la contraseña'),
  })

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(schema),
  })

  const handleLogin = async (values: any) => {
    try {
      setLoading(true)
      const response = await axios.post('/auth/login', values)
      if (response.data && response.data.success) {
        setIsAuth(true)
        return navigate('/')
      }
    } catch (e: any) {
      toast.error(
        e.response.data.message || 'Ocurrió un error al inciar sesión'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[400px] m-auto p-2">
      <form
        className="flex flex-col gap-2 p-4 rounded border"
        onSubmit={form.onSubmit((values) => handleLogin(values))}
      >
        <LoadingOverlay visible={loading} />
        <TextInput
          label="Correo electrónico"
          type="email"
          {...form.getInputProps('email')}
        />
        <PasswordInput label="Contraseña" {...form.getInputProps('password')} />
        <Button type="submit">Iniciar sesión</Button>
        <Link to="/auth/signup" className="flex justify-center">
          <Button variant="transparent">
            ¿No tienes cuenta? Crea una ahora
          </Button>
        </Link>
      </form>
    </div>
  )
}
