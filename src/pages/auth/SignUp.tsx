import { Button } from "@/components/ui/button";
import { FormInput} from "@/components/FormInput"
import { Controller, useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner"

type Inputs = {
    name: string
    lastname: string
    email: string
    password: string
    confirm_password: string
}

export default function SignUp() {

    const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const [loading, setLoading] = useState<boolean>(false)

    function handleSignUp(formData: Inputs) {
        console.log(formData)
        return
        setLoading(true)
        axios.post("/users", formData)
            .then((res) => {
                console.log(res)
                toast.success("Registro exitoso")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="max-w-[600px] bg-white m-auto">
            <form className="w-full p-6 rounded-md shadow" onSubmit={handleSubmit(handleSignUp)}>
                <h1 className="text-4xl font-black mb-4 tracking-tight text-balance">Registro</h1>
                <div className="mb-2">
                    <div className="flex flex-col mb-4">
                        <Controller
                            name="name"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => <FormInput label="Nombre(s)" className="" type="text" value={field.value} onChange={field.onChange}/>} 
                        >
                        </Controller>
                    </div>

                    {/* <div className="flex flex-col mb-4">
                        <Label>Apellido(s)</Label>
                        <Input className="" type="text" {...register("lastname", { required: true })}
                            aria-invalid={errors.confirm_password ? "true" : "false"}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label>Correo electrónico</Label>
                        <Input className="" type="email" {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </div>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex flex-col grow">
                        <Label>Contraseña</Label>
                        <Input className="" type="password" {...register("password", { required: true, min: 8 })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                    </div>

                    <div className="flex flex-col grow">
                        <Label>Confirmar contraseña</Label>
                        <Input
                            className=""
                            type="password"
                            {...register("confirm_password", { required: true, min: 8 })}
                            aria-invalid={errors.confirm_password ? "true" : "false"}
                        />
                    </div> */}
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                    <Button className="grow w-full" type="submit">Registrarse</Button>
                    <Button variant={"link"}>¿Ya tienes cuenta? Inicia sesión</Button>
                </div>
            </form>
        </div>
    )
}