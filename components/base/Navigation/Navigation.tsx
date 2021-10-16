import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TextButton } from 'components/common/Button/TextButton';
import Menu from '../Menu';
import styles from './Navigation.module.scss'

export default function Navigation() {
  return (
    <div className={styles.wrapper}>
      <TextButton onClick={() => {}}>
        <ArrowBackIosNewIcon />
      </TextButton>
      <Menu />
    </div>
  )
}