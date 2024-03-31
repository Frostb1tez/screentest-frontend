import dynamic from 'next/dynamic'
import { Controller, useFormContext } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type IProps = {
  name: string
}

export default function RHFRichText({ name }: IProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <ReactQuill theme="snow" {...field} />}
    />
  )
}
