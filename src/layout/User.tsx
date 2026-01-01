import { useAuth } from '@/providers/authProvider'
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import axios from '@/lib/axios'
import { ChevronRight, LogOut } from 'lucide-react'
import { forwardRef } from 'react'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

export const User = () => {

  const { logOut } = useAuth()

  const handleLogout = async () => {
    logOut()
    await axios.get("/auth/logout")
  }
  

  const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
      <UnstyledButton
        ref={ref}
        style={{
          padding: 'var(--mantine-spacing-md)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'var(--mantine-radius-sm)',
        }}
        {...others}
      >
        <Group>
          <Avatar src={image} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <ChevronRight size={16} />}
        </Group>
      </UnstyledButton>
    )
  )
  return (
    <Menu width={'200'} position="top-end">
      <Menu.Target>
        <UserButton
          email="gustavohernandez.dev@gmail.com"
          name="Gustavo Hernández"
          image="https://cdn.jsdelivr.net/gh/alohe/memojis/png/notion_8.png"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Acciones</Menu.Label>
        <Menu.Item leftSection={<LogOut size={14} />} color="red" onClick={handleLogout}>
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
