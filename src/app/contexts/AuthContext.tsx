import { ActionMap, AuthState, AuthUser, EmailPayload, JWTContextType, JWTLoginPayload } from '@/@types/auth'
import axios from '@/utils/axios'
import { setSession } from '@/utils/jwt'
import { ReactNode, createContext, useEffect, useReducer } from 'react'

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  SendEmail = 'SEND_EMAIL',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean
    user: AuthUser
  }
  [Types.Login]: {
    user: AuthUser
  }
  [Types.Logout]: undefined
  [Types.SendEmail]: EmailPayload
}

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>]

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext<JWTContextType | null>(null)

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [state, dispatch] = useReducer(JWTReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''

        if (accessToken) {
          setSession(accessToken)

          const response = await axios.get('/auth/me')
          const { user } = response.data

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    // initialize()
  }, [])

  const login = async ({ identity, password }: JWTLoginPayload) => {
    const response = await axios.post('/auth/sign-in', {
      identity,
      password,
    })
    const { accessToken, user } = response.data
    setSession(accessToken)

    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    })
  }

  const sendEmail = async (payload: EmailPayload) => {
    console.log('🚀 ~ sendEmail ~ payload:', payload)
    const response = await axios.post('/email/send', payload)
    return response.data
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: Types.Logout })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        sendEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
