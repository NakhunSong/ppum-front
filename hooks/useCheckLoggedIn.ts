import { useRouter } from "next/dist/client/router";
import { useLoggedInCheck } from 'lib/apis/auth';
import { useCallback } from 'react'

export function useCheckLoggedIn() {
  const router = useRouter()
  const handleFailure = useCallback(() => {
    router.push('/login')
  }, [])
  return useLoggedInCheck({ handleFailure })
}