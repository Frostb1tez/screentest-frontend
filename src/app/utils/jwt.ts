import axios from './axios'

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

export { setSession }
