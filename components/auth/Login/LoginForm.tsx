import Logo from 'components/base/Logo'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import { useLogin } from 'lib/apis/auth'
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
  const mutation = useLogin(() => { router.push('/trips') })

  const handleLogin = useCallback(() => {
    const form = { username: email, password }
    mutation.mutate(form)
  }, [])

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
              ? '로딩중'
              : '로그인'}
          </Button>
        </Input.InputWrapper>
        <div className={styles.guide}>'뿜'이 처음이신가요?</div>
      </div>
    </div>
  )
}