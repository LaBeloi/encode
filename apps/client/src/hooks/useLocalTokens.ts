import { useCallback, useMemo } from "react";
import { Tokens } from 'interfaces';

export function useLocalTokens(): [Tokens | null, (val: Tokens) => void] {
  const valueStr = window.localStorage.getItem('tokens');
  const setValue = useCallback(
    (val: Tokens) => window.localStorage.setItem('tokens', JSON.stringify(val ?? {})),
    []
  )

  const value = useMemo<Tokens | null>(
    () => (valueStr ? JSON.parse(valueStr) : null),
    [valueStr]
  )

  return [value, setValue]
}
