'use client'
import { EmailPayload } from '@/@types/auth'
import { FormProvider, RHFRichText, RHFTextField } from '@/components/hook-form'
import useAuth from '@/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { InputAdornment, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormSchema, defaultValues } from './schema'

const EmailSenderForm = () => {
  const { sendEmail } = useAuth()
  const { push } = useRouter()
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues,
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods

  const onSubmit = async (payload: EmailPayload) => {
    try {
      await sendEmail(payload)
      alert('Email sent successfully')
    } catch (err: any) {
      //TODO: should defined error type
      alert(err.message)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="sendTo"
          InputProps={{
            startAdornment: <InputAdornment position="start">To : </InputAdornment>,
          }}
        />
        <RHFTextField
          name="subject"
          InputProps={{
            startAdornment: <InputAdornment position="start">Subject : </InputAdornment>,
          }}
        />
        <RHFRichText name="message" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Send Email
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export default EmailSenderForm
