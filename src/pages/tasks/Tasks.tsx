import NewTaskForm from '@/components/tasks/NewTaskForm'
import {
  ActionIcon,
  Button,
  Card,
  Modal,
  Text,
  Menu,
  Checkbox,
  Skeleton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CircleCheckBig, EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import type { Task } from '@/types/Task'

export const Tasks = () => {
  const [opened, { open, close }] = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const [tasks, setTasks] = useState<Task[]>([])
  const handleGetTasks = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/tasks')
      if (response.data.success) {
        setTasks(response.data.data.tasks)
      }
    } catch {
      toast.error('No se han podido actualizar las tareas')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  const handleOnClose = () => {
    close()
    handleGetTasks()
  }

  const handleMarkAsDone = async (taskId: string, checked: boolean) => {
    if (!checked) return
    if (!taskId) return
    try {
      const response = await axios.post('/tasks/done', { taskId })

      if (response.data.success)
        setTasks((all) => (all.filter((t: Task) => t._id !== taskId)))
    } catch {
      toast.error("No se ha podido completar la tarea, intenta más tarde.")
    }
  }

  const taskList = (
    <div className="grid grid-cols-1 gap-2">
      {tasks
        .filter((t: Task) => !t.done)
        .map((task: Task) => {
          return (
            <Card withBorder shadow="sm" padding="lg" radius="md" className='cursor-pointer'>
              <div className="flex items-center justify-between gap-6">
                <Checkbox
                  radius={'xl'}
                  size="lg"
                  color="lime"
                  autoContrast={false}
                  checked={task.done}
                  onChange={(e) => handleMarkAsDone(task._id, e.target.checked)}
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

      {isLoading ? (
        <TasksSkeleton />
      ) : taskList ? (
        taskList
      ) : (
        <Text>Agrega una nueva tarea para verla aqui :D</Text>
      )}

      <Modal opened={opened} onClose={close} title={'Nueva tarea'}>
        <NewTaskForm onClose={handleOnClose} />
      </Modal>
    </div>
  )
}

const TasksSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <Skeleton h={80} />
      <Skeleton h={80} />
      <Skeleton h={80} />
    </div>
  )
}