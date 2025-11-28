import NewTaskForm from '@/components/tasks/NewTaskForm'
import { Button, Card, Modal, Text } from '@mantine/core'
import { useDisclosure, useToggle } from '@mantine/hooks'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Tasks = () => {
  const [opened, { open, close, toggle }] = useDisclosure()

  const [tasks, setTasks] = useState([])
  const handleGetTasks = async () => {
    try {
      const response = await axios.get("/tasks")
      if (response.data.success) {
        console.log(response.data)
        setTasks(response.data.data.tasks)
      }
    } catch {
      toast.error("No se han podido actualizar las tareas")
    } finally {

    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  const taskList = (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
      {
        tasks?.map((task: { title: string, description: string }) => {
          return (
            <Card withBorder shadow="sm" padding="lg" radius="md" >
                <Text fw={'bold'}>{task.title}</Text>   
                <Text>{task.description}</Text>
            </Card>
          )
        })
      }
    </div>
  )

  return (
    <div>
     <div className='flex justify-between mb-2'>
      <Text size='xl' fw='bold'>Mis tareas</Text>
       <Button onClick={open}>Nueva tarea</Button>

     </div>
      {taskList ? taskList : <Text>Agrega una nueva tarea para verla aqui :D</Text>}

      <Modal opened={opened} onClose={close} title={"Nueva tarea"}>
        <NewTaskForm onClose={close} />
      </Modal>
    </div>
  )
}
