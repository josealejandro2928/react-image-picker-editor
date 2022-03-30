import { useRef } from 'react';
import { useEffect } from 'react';

const useDebounce = (fn: Function = (flag: React.MutableRefObject<boolean>) => { }, dep: Array<any>, ms = 1000, ignoringInitialTriggers = 1) => {
  const mount = useRef<number>(0);
  const timeout = useRef<any>(null);
  const flag = useRef<any>(false);

  useEffect(() => {
    if (mount.current < ignoringInitialTriggers) {
      mount.current++;
      return;
    }
    if (flag.current) {
      return;
    }
    timeout.current = setTimeout(() => {
      flag.current = true;
      clearTimeout(timeout.current);
      fn(flag);
    }, ms)
    return () => {
      clearTimeout(timeout.current);
    }
  }, [dep])

}
export default useDebounce
