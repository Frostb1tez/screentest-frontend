'use client'
import { AuthProvider } from './contexts/AuthContext'

type Props = {
  children: React.ReactNode
}

export function Provider({ children }: Readonly<Props>) {
  return <AuthProvider>{children}</AuthProvider>
}
