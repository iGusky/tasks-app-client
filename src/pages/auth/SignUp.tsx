import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button, Input, InputLabel, LoadingOverlay } from '@mantine/core'
import { Link } from 'react-router'

type Inputs = {
  name: string
  lastname: string
  email: string
  password: string
  confirm_password: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState<boolean>(false)

  function handleSignUp(formData: Inputs) {
    setLoading(true)
    axios
      .post('/users', formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-150 bg-white m-auto p-2">
      <form
        className="flex flex-col p-6 rounded-md border"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <LoadingOverlay visible={loading} />
        <p className="text-4xl font-black mb-2 tracking-tight text-balance">
          Registro
        </p>
        <div>
          <div className="flex flex-col mb-2">
            <InputLabel>Nombre(s)</InputLabel>
            <Input type="text" {...register('name', { required: true })} />
          </div>
          <div className="flex flex-col mb-2">
            <InputLabel>Apellido(s)</InputLabel>
            <Input
              type="text"
              {...register('lastname', { required: true })}
              aria-invalid={errors.confirm_password ? 'true' : 'false'}
            />
          </div>
          <div className="flex flex-col mb-2">
            <InputLabel>Correo electrónico</InputLabel>
            <Input
              type="email"
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="flex flex-col grow">
            <InputLabel>Contraseña</InputLabel>
            <Input
              type="password"
              {...register('password', { required: true, min: 8 })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
          </div>

          <div className="flex flex-col grow">
            <InputLabel>Confirmar contraseña</InputLabel>
            <Input
              type="password"
              {...register('confirm_password', { required: true, min: 8 })}
              aria-invalid={errors.confirm_password ? 'true' : 'false'}
            />
          </div>
        </div>

        <Button type="submit">Registrarse</Button>
        <Link to="/auth/login" className="flex justify-center">
          <Button variant={'transparent'}>
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Link>
      </form>
    </div>
  )
}
