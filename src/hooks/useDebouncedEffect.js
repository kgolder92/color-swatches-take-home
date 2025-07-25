import { useEffect } from "react";
import debounce from "lodash.debounce";

export function useDebouncedEffect(callback, dependencies, delay) {
  useEffect(() => {
    let cleanup;
    const debounced = debounce(() => {
      const maybeCleanup = callback();
      if (typeof maybeCleanup === "function") {
        cleanup = maybeCleanup;
      }
    }, delay);
    debounced();

    return () => {
      debounced.cancel();
      if (typeof cleanup === "function") cleanup();
    };
  }, [...dependencies, delay]);
}
