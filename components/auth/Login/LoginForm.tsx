import Logo from 'components/base/Logo'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
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
  const [email, handleEmail] = useInput('test@test.com')
  const [password, handlePassword] = useInput('test1234')

  const handleLogin = useCallback(() => {
    router.push('/trips/2')
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
          <Button onClick={handleLogin}>로그인</Button>
        </Input.InputWrapper>
        <div className={styles.guide}>'뿜'이 처음이신가요?</div>
      </div>
    </div>
  )
}