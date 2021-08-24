import { useMutation, useQueryClient } from 'react-query'
import { backendAPI } from './api'

export function useLogin(callback) {
  const queryClient = useQueryClient()
  return useMutation(async (payload: loginPayloadType) => {
    const response = await backendAPI.post<loginResultType>('/auth/login', payload)
    const { access_token: accessToken } = response?.data
    queryClient.setQueryData('accessToken', accessToken)
  }, {
    onSuccess: callback,
    onError: () => { console.log('Login Failure') }
  })
}

type loginPayloadType = {
  username: string,
  password: string,
}

type loginResultType = {
  access_token: string,
}