import CircularProgress from '@mui/material/CircularProgress'
import Button from 'components/common/Button'
import Logo from 'components/base/Logo'
import Input from 'components/common/Input'
import { useLoggedInCheck, useLogin } from 'lib/apis/auth'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useState } from 'react'
import styles from './LoginForm.module.scss'

function useInput(initValue) {
  const [input, setInput] = useState(initValue)
  const handleInput = useCallback(e => {
    setInput(() => e.target.value)
  }, [])
  return [input, handleInput]
}

export default function LoginForm() {
  const router = useRouter()
  const [email, handleEmail] = useInput(process.env.NEXT_PUBLIC_TEST_EMAIL)
  const [password, handlePassword] = useInput(process.env.NEXT_PUBLIC_TEST_PASSWORD)
  const moveTrips = () => router.push('/trips')
  const mutation = useLogin(moveTrips)
  const { data } = useLoggedInCheck({
    handleSuccess: moveTrips,
  })
  
  const handleLogin = useCallback(() => {
    const form = { username: email, password }
    mutation.mutate(form)
  }, [])

  if (data) {
    return (
      <CircularProgress />
    )  
  }

  return (
    <div className={styles.wrapper}>
      <Logo />
      <div className={styles.form}>
        <Input.InputWrapper marginBottom>
          <Input
            value={email}
            onChange={handleEmail}
          />
        </Input.InputWrapper>
        <Input.InputWrapper marginBottom>
          <Input
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <Button onClick={handleLogin}>
            {mutation.isLoading
              ? (
                <CircularProgress
                  color="inherit"
                  size={15}
                  style={{ verticalAlign: 'middle' }}
                />
              )
              : '로그인'}
          </Button>
        </Input.InputWrapper>
        <div className={styles.guide}>'뿜'이 처음이신가요?</div>
      </div>
    </div>
  )
}