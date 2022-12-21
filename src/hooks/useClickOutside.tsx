import { useRef, useEffect, useCallback } from "react";

const useClickOutside = <T extends HTMLElement>(callback: Function) => {
  const ref = useRef<T>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const inside = ref.current.contains((e.target as Node));
    if (inside) return;

    callback();
  }, [callback, ref])

  useEffect(() => {
    document.addEventListener('click', handleClick, false);

    return () => {
      document.removeEventListener('click', handleClick, false);
    };
  }, [handleClick]);

  return ref;
};

export default useClickOutside;
