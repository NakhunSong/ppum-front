import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }) {
  const [mounted, setMounted] = useState<boolean>(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (mounted
    ? createPortal(
      children,
      document.querySelector("#myPortal")
    ) : null
  )
}