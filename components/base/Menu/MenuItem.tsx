import styled from '@emotion/styled'
import { keyframes } from '@mui/styled-engine'

export default function MenuItem({
  children,
  onClick,
}) {
  return (
    <MenuItemWrapper onClick={onClick}>
      {children}
    </MenuItemWrapper>
  )
}

const appear = keyframes`
  from {
    top: 0;
    transform: scale(0,0);
  }
  to {
    top: -56px;
    transform: scale(1,1);
  }
`

const disappear = keyframes`
  from {
    top: -56px;
    transform: scale(1,1);
  }
  to {
    top: 0;
    transform: scale(0,0);
  }
`

const float = keyframes`
  from, to {
    transform: translate3d(0,0,0);
  }
  50% {
    transform: translate3d(0,-10px,0);
  }
`

const itemSize = '40px'

const MenuItemWrapper = styled.div`
  align-items: center;
  animation: ${float} 3s 0.5s ease infinite;
  cursor: pointer;
  display: flex;
  height: ${itemSize};
  justify-content: center;
  width: ${itemSize};
  & + & {
    margin-left: 16px;
  }
`

const MenuItemGroup = styled.div<MenuItemGroupProps>`
  animation: ${(props) => props.visible
    ? appear
    : disappear} 0.5s ease-in-out;
  display: flex;
  transform: scale(${(props) => props.visible ? 1 : 0});
  position: absolute;
  right: -16px;
  top: -56px;
`

type MenuItemGroupProps = {
  visible: boolean
}

MenuItem.Group = MenuItemGroup
