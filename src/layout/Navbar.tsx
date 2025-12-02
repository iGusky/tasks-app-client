import { NavLink } from '@mantine/core'
import { Clipboard, Home } from 'lucide-react'
import { Link } from 'react-router'

export const Navbar = () => {
  return (
    <div>
      <div>
        <Link to={'/'}>
          <NavLink
            active
            label={'Inicio'}
            leftSection={<Home size={16} strokeWidth={2} />}
          ></NavLink>
        </Link>

        <Link to={'/tasks'}>
          <NavLink
            label={'Mis tareas'}
            leftSection={<Clipboard size={'16'} strokeWidth={'2'} />}
          ></NavLink>
        </Link>
      </div>
    </div>
  )
}
