import { useCallback, useEffect, useRef } from 'react';

export function useClickoutside(callback: Function) {
  const ref = useRef(null);
  const handleClickoutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      console.log('hi click');
      callback();
    }
  }, []);
  const handlePressEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      console.log('hi');
      callback();
    }
  }, []);
  useEffect(() => {
    document.addEventListener('click', handleClickoutside);
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.addEventListener('click', handleClickoutside);
      document.addEventListener('keydown', handlePressEsc);
    }
  }, []);

  return { ref };
}