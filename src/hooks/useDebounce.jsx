import { useRef, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function useDebouncedCallback(callback, delay = 500) {
  const callbackRef = useRef(callback);

  // Cập nhật callback mới mỗi khi callback thay đổi
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Tạo hàm debounce
  const debouncedFn = useRef(
    debounce((...args) => {
      callbackRef.current(...args);
    }, delay)
  ).current;

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  // Trả về hàm đã debounce
  return useCallback(
    (...args) => {
      debouncedFn(...args);
    },
    [debouncedFn]
  );
}
