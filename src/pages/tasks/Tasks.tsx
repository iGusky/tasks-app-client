import NewTaskForm from '@/components/tasks/NewTaskForm'
import { Button, Modal } from '@mantine/core'
import { useDisclosure, useToggle } from '@mantine/hooks'

export const Tasks = () => {
  const [opened, {open, close, toggle}] = useDisclosure()

  return (
    <div>
        <Button onClick={open}>Nueva tarea</Button>

        <Modal opened={opened} onClose={close} title={"Nueva tarea"}>
          <NewTaskForm onClose={close} />
        </Modal>
    </div>
  )
}
