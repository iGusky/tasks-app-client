import { Button, Paper, Text } from '@mantine/core'

const Home = () => {
  return (
    <div>
        <Paper>
          <Text fw={"bold"}>Bienvenidos</Text>
          <Text size='xs' c='dimmed'>Recientes</Text>
          <Button>Enviar</Button>
        </Paper>
    </div>
  )
}

export default Home