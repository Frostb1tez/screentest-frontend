import * as yup from 'yup'

export const defaultValues = {
  sendTo: '',
  subject: '',
  message: '',
}

export const FormSchema = yup.object().shape({
  sendTo: yup.string().required('Please enter email address').email('Please enter valid email address'),
  subject: yup.string().required('Please enter subject'),
  message: yup.string().required('Please enter message'),
})
