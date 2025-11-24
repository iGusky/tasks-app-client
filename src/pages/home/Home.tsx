import { Paper, Text } from '@mantine/core'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Paper>
          <Text fw={"bold"}>Bienvenidos</Text>
          <Text size='xs' c='dimmed'>Recientes</Text>
        </Paper>
    </div>
  )
}

export default Home