import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { TextButton } from 'components/common/Button/TextButton'
import { useClickoutside } from 'hooks/useClickoutside'
import styles from './Menu.module.scss'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'

export default function Menu() {
  const [open, setOpen] = useState<boolean>(false)
  const handleMenu = useCallback((status) => {
    return () => setOpen(status)
  }, [])
  const { ref } = useClickoutside(handleMenu(false))
  return (
    <div
      className={styles.wrapper}
      ref={ref}
    >
      <TextButton onClick={handleMenu(true)}>
        <div className={styles.menu_icon}>
          <MenuIcon fontSize="large" />
        </div>
      </TextButton>
      <MenuItem.Group visible={open}>
        <MenuItem onClick={() => {}}>
          <LocalAirportOutlinedIcon fontSize="large" />
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <LogoutIcon fontSize="large" />
        </MenuItem>
      </MenuItem.Group>
    </div>
  )
}
