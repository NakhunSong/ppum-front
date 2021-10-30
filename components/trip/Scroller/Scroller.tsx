import { forwardRef, ReactElement } from 'react'
import styled from '@emotion/styled'
import { RefObject } from 'react-transition-group/node_modules/@types/react'

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
  /* height: 100%; */
`

const ScrollerWrapper = styled.div<ScrollerWrapperProps>`
  // position: absolute;
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

const Target = styled.div<TargetProps>`
  position: absolute;
  display: inline-block;
  margin-left: 50%;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  transform: translateX(-50%);
`

const ScrollerItemWrapper = styled.div<ScrollerItemWrapperProps>`
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
    font-weight: 600;
  `}
`

export default function Scroller({
  children,
  targetRef,
  scrollerRef,
  height = '70px',
  width = '60px',
}: ScrollerProps) {
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

Scroller.Item = ScrollerItem

type ScrollerWrapperProps = {
  itemHeight: number | string
  itemWidth: number | string
}

type TargetProps = {
  height: number | string
  width: number | string
}

type ScrollerItemWrapperProps = {
  gap: number | string
  selected: boolean
}

type ScrollerProps = {
  children: any
  targetRef: RefObject<any>
  scrollerRef: RefObject<any>,
  height?: number | string
  width?: number | string
}

type ScrollerItemProps = {
  children: ReactElement;
  selected: boolean;
  gap?: string;
}