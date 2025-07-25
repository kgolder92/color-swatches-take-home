import { useEffect } from "react";
import debounce from "lodash.debounce";

export function useDebouncedEffect(callback, dependencies, delay) {
  useEffect(() => {
    const handler = debounce(callback, delay);
    handler();
    return () => handler.cancel();
  }, [...dependencies, delay]);
}
