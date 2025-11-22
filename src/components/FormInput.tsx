import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from './ui/field';

interface Props {
    type: string;
    label: string;
    value: any;
    onChange: (input: any) => void
    required?: boolean
    error?: string;
    className?: string;
}

export function FormInput({type, label, value, onChange, required = false, error, className}: Props) {
  return (
    <Field className={className}>
        <FieldLabel>{label}</FieldLabel>
        <Input type={type} value={value} onChange={onChange} required={required}></Input>
        <FieldError>{error}</FieldError>
    </Field>
  )
}
