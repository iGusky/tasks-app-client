import { useAuth } from '@/providers/authProvider'
import { Avatar, Group, LoadingOverlay, Menu, Text, UnstyledButton } from '@mantine/core'
import axios from '@/lib/axios'
import { ChevronRight, LogOut } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

interface Profile {
  fullname: string
  enamil: string
}

export const User = () => {

  const { logOut } = useAuth()
  const [profile, setProfile] = useState<Profile>({
    fullname: '-',
    enamil: '-'
  });
  const [fetchingProfile, setFetchingProfile] = useState<boolean>(false)

  const handleLogout = async () => {
    logOut()
    await axios.get("/auth/logout")
  }

  const loadProfile = async () => {
    try {
      setFetchingProfile(true)
      const response = await axios.get('/users/profile')
      setProfile(response.data.data)
    } finally {
      setFetchingProfile(false)
    }
  }

  useEffect(()=> {
    loadProfile()
  }, [])
  

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

          <div style={{ flex: 1 }} className='relative'>
            <LoadingOverlay visible={fetchingProfile}/>
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
          email={profile?.email}
          name={profile?.fullname}
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
