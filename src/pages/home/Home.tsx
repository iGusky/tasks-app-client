import { Button, Paper, Text } from '@mantine/core'

const Home = () => {
  return (
    <div>
        <Paper>
          <Text size='lg' fw={"bold"}>Bienvenido</Text>
          <Text size='sm' c='dimmed'>Recientes</Text>
        </Paper>
    </div>
  )
}

export default Home