import { useCallback, useEffect, useRef } from 'react';

export function useClickoutside(callback: Function) {
  const ref = useRef(null);
  const handleClickoutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, []);
  const handlePressEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      callback();
    }
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickoutside);
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.addEventListener('mousedown', handleClickoutside);
      document.addEventListener('keydown', handlePressEsc);
    }
  }, []);

  return { ref };
}