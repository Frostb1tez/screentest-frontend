import axios from 'axios'

const axiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY ?? 'http://localhost:8000/api' })

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || 'Something went wrong'),
)

export default axiosInstance
