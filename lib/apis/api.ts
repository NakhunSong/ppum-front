import axios from 'axios'
import { queryClient } from 'pages/_app'

export const backendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
  withCredentials: true,
})

backendAPI.interceptors.request.use((config) => {
  const accessToken = queryClient.getQueryData('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})