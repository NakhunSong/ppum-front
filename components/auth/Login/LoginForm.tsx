import Logo from "components/base/Logo";
import Button from "components/common/Button";
import Input from "components/common/Input";
// import { Wrapper } from "components/common/Input/Input";
import { useCallback, useState } from "react";
import styles from './LoginForm.module.scss';

function useInput(initValue) {
  const [input, setInput] = useState(initValue);
  const handleInput = useCallback(e => {
    setInput(() => e.target.value);
  }, [])
  return [input, handleInput];
}

export default function LoginForm() {
  const [email, handleEmail] = useInput('');
  const [password, handlePassword] = useInput('');

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
            value={password}
            onChange={handlePassword}
          />
        </Input.InputWrapper>
        <Button>로그인</Button>
        <div className={styles.guide}>'뿜'이 처음이신가요?</div>
      </div>
    </div>
  );
}