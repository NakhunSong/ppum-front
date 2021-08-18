import { forwardRef, ReactElement } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
`

const ScrollerWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  overflow-x: scroll;
  transition: all .2s ease;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  .scroller_item {
    height: ${(props) => props.itemHeight};
    width: ${(props) => props.itemWidth};
  }
`

const Target = styled.div`
  position: absolute;
  display: inline-block;
  margin-left: 50%;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  transform: translateX(-50%);
`

const ScrollerItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.gap};
  user-select: none;
  transform: translateX(-50%);

  &:nth-child(1) {
    margin-left: 50%;
  }

  &:nth-last-child(1) {
    margin-right: 50%;
  }

  ${(props) => props.selected && `
    text-decoration: underline;
  `}
`

export default function Scroller({
  children,
  targetRef,
  scrollerRef,
  height = '70px',
  width = '60px',
}) {
  return (
    <Wrapper>
      <Target
        ref={targetRef}
        height={height}
        width={width}
      />
      <ScrollerWrapper
        ref={scrollerRef}
        itemHeight={height}
        itemWidth={width}
      >
        {children}
      </ScrollerWrapper>
    </Wrapper>
  )
}

type ScrollerItemProps = {
  children: ReactElement;
  selected: boolean;
  gap?: string;
}

const ScrollerItem = forwardRef((props: ScrollerItemProps, ref: any) => {
  const {
    children,
    selected,
    gap = '30px',
  } = props
  return (
    <ScrollerItemWrapper
      className="scroller_item"
      ref={ref}
      selected={selected}
      gap ={gap}
    >
      {children}
    </ScrollerItemWrapper>
  )
})

Scroller.item = ScrollerItem