import { useMutation, useQuery, useQueryClient } from 'react-query'
import { backendAPI } from './api'

export function useLogin(callback) {
  const queryClient = useQueryClient()
  return useMutation(async (payload: loginPayloadType) => {
    const response = await backendAPI.post<loginResultType>('/auth/login', payload)
    const { access_token: accessToken } = response?.data
    queryClient.setQueryData('accessToken', accessToken)
  }, {
    onSuccess: () => {
      callback()
    },
    onError: () => { console.log('Login Failure') }
  })
}

export function useLoggedInCheck({
  handleSuccess,
  handleFailure,
}: useLoggedInCheckType) {
  const queryClient = useQueryClient()
  return useQuery('accessToken', () => {
    return queryClient.getQueryData('accessToken')
  },{
    onSuccess: (token) => {
      if (token) {
        handleSuccess && handleSuccess()
      }
    },
    onError: () => {
      console.log('hi')
      handleFailure && handleFailure()
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.removeQueries('accessToken', { exact: true })
  }
}

type loginPayloadType = {
  username: string,
  password: string,
}

type loginResultType = {
  access_token: string,
}

type useLoggedInCheckType = {
  handleSuccess?: Function
  handleFailure?: Function
}