import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";

export default function SignIn() {
    return (
        <div className="max-w-[600px] bg-white m-auto">
            <form className=" w-full p-6 rounded-md shadow">
                <h1 className="text-4xl font-black mb-4 tracking-tight text-balance">Registro</h1>
                <div className="mb-2">
                    <div className="flex flex-col">
                        <Label>Correo electrónico</Label>
                        <Input className="" type="email" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col grow">
                        <Label>Contraseña</Label>
                        <Input className="" type="password" />
                    </div>

                    <div className="flex flex-col grow">
                        <Label>Confirmar contraseña</Label>
                        <Input className="" type="password" />
                    </div>
                </div>

                <div className="flex flex-col my-4 items-center justify-center">
                    <Button className="grow w-full">Registrarse</Button>
                </div>
            </form>
        </div>
    )
}