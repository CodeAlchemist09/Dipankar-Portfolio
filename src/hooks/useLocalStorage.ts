import { useCallback, useEffect, useState } from "react";

/**
 * useLocalStorage — persists state in localStorage and syncs across
 * components in the same tab via a custom event.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          if (resolved === null || resolved === undefined) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          }
          window.dispatchEvent(new CustomEvent("dy-storage", { detail: { key } }));
        } catch {
          /* storage full — keep in-memory */
        }
        return resolved;
      });
    },
    [key]
  );

  useEffect(() => {
    const onCustom = (e: Event) => {
      const k = (e as CustomEvent).detail?.key;
      if (k !== key) return;
      try {
        const raw = window.localStorage.getItem(key);
        setValue(raw !== null ? (JSON.parse(raw) as T) : initial);
      } catch {
        /* ignore */
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initial);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("dy-storage", onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("dy-storage", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [key, initial]);

  return [value, set] as const;
}

/** Read a file as a data URL (for photo / banner / credential uploads). */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
