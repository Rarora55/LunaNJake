import { useMemo, useState } from 'react'
import type { MediaStatus } from './types'

export function useMediaFallback() {
  const [statuses, setStatuses] = useState<Record<string, MediaStatus>>({})

  const markFailed = (id: string) => {
    setStatuses((prev) => (prev[id] === 'failed' ? prev : { ...prev, [id]: 'failed' }))
  }

  const isFailed = useMemo(() => (id: string) => statuses[id] === 'failed', [statuses])

  return { markFailed, isFailed }
}
