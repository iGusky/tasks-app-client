import { Button, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'

import axios from '@/lib/axios'

const NewTaskForm = ({ onClose }: { onClose: () => void }) => {
  const task = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
      limitDate: null,
      done: false,
    },
    validate: {
      title: (value) => (!value.length ? 'El título es requerido' : null),
    },
  })

  const handleStoreTask = async (values: any) => {
    try {
      const response = await axios.post('/tasks', values)
      if (response.data.success) {
        onClose()
      }
    } catch {
    } finally {
    }
  }

  return (
    <div>
      <form
        onSubmit={task.onSubmit(handleStoreTask)}
        className="flex flex-col gap-2"
      >
        <TextInput
          label="Titulo"
          key={task.key('title')}
          withAsterisk
          {...task.getInputProps('title')}
          placeholder="Hacer la compra"
        />
        <Textarea
          label="Descripción"
          key={task.key('description')}
          {...task.getInputProps('description')}
          autosize
          minRows={5}
          placeholder="Pan de molde, jamon, aceite..."
        />
        <DatePickerInput
          lang="es"
          label="Fecha"
          key={task.key('limitDate')}
          {...task.getInputProps('limitDate')}
          clearable
          placeholder="¿Cuando o hasta cuando se debe hacer esta tarea?"
        />

        <div className="flex justify-center gap-2 mt-2">
          <Button variant="subtle">Cancelar</Button>
          <Button color="lime" type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewTaskForm
