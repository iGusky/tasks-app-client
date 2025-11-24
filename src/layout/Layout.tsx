import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { type ReactNode } from 'react'
import { Link } from 'react-router';
import { Navbar } from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 40 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header className='bg-red-500'>
                Header!
            </AppShell.Header>
            <AppShell.Navbar className='bg-green-100'>
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}

export default Layout