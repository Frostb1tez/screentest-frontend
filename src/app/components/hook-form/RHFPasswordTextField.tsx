import { RHFTextField } from '@/components/hook-form'
import { Button, InputAdornment, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type IProps = {
  name: string
}

type Props = IProps & TextFieldProps

export default function RHFPasswordTextField({ name, ...other }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const { watch } = useFormContext()
  const value = watch(name)

  useEffect(() => {
    setPassword(value)
  }, [value])

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <RHFTextField
      name={name}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button onClick={handleShowPassword} color="info" disabled={!password}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  )
}
