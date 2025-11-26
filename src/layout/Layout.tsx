import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useEffect, type ReactNode } from 'react'
import { Navbar } from './Navbar';
import { useLocation } from 'react-router';

const Layout = ({ children }: { children: ReactNode }) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const location = useLocation()

    useEffect(() => {
        if(mobileOpened) toggleMobile()
    }, [location])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }, }}
            padding="md"
        >
            <AppShell.Header>
               <Group h="100%" px="md">
                    <Burger onClick={toggleMobile} hiddenFrom="sm" size="sm"/>
                    <Burger onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    Gestiona tus tareas
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section grow>
                    <Navbar />
                </AppShell.Section>
                <AppShell.Section>
                    Nombre del usuario
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}

export default Layout