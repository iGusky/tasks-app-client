import NewTaskForm from '@/components/tasks/NewTaskForm'
import {
  ActionIcon,
  Button,
  Card,
  Modal,
  Text,
  Menu,
  Checkbox,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CircleCheckBig, EllipsisVertical, Pencil, Trash2 } from 'lucide-react'

export const Tasks = () => {
  const [opened, { open, close }] = useDisclosure()

  const [tasks, setTasks] = useState([])
  const handleGetTasks = async () => {
    try {
      const response = await axios.get('/tasks')
      if (response.data.success) {
        console.log(response.data)
        setTasks(response.data.data.tasks)
      }
    } catch {
      toast.error('No se han podido actualizar las tareas')
    } finally {
    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  const taskList = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {tasks
        .filter((t: { done: boolean }) => !t.done)
        .map((task: { title: string; description: string }) => {
          return (
            <Card withBorder shadow="sm" padding="lg" radius="md">
              <div className="flex items-center justify-between gap-6">
                <Checkbox
                  radius={'xl'}
                  size="lg"
                  color="lime"
                  autoContrast={false}
                />
                <div className="grow">
                  <div className="flex justify-between">
                    <Text fw={'bold'}>{task.title}</Text>

                    <Menu>
                      <Menu.Target>
                        <ActionIcon variant="transparent" radius={'xl'}>
                          <EllipsisVertical size={14} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Acciones</Menu.Label>
                        <Menu.Item leftSection={<CircleCheckBig size={12} />}>
                          Completar
                        </Menu.Item>
                        <Menu.Item leftSection={<Pencil size={12} />}>
                          {' '}
                          Editar
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item leftSection={<Trash2 size={12} />} c={'red'}>
                          Eliminar
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                  <Text size="sm" c={'dimmed'}>
                    {task.description}
                  </Text>
                </div>
              </div>
            </Card>
          )
        })}
    </div>
  )

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Text size="xl" fw="bold">
          Mis tareas
        </Text>
        <Button onClick={open}>Nueva tarea</Button>
      </div>
      {taskList ? (
        taskList
      ) : (
        <Text>Agrega una nueva tarea para verla aqui :D</Text>
      )}

      <Modal opened={opened} onClose={close} title={'Nueva tarea'}>
        <NewTaskForm onClose={close} />
      </Modal>
    </div>
  )
}
