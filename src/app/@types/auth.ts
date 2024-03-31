export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthUser = null | Record<string, any>

export type AuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
}

export type JWTContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
  method: 'jwt'
  login: (identity: JWTLoginPayload) => Promise<void>
  logout: () => Promise<void>
  sendEmail: (email: EmailPayload) => Promise<void>
}

export type JWTLoginPayload = {
  identity: string
  password: string
}

export type EmailPayload = {
  sendTo: string
  subject: string
  message: string
}
