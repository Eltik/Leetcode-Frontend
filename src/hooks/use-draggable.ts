import { useState, useEffect, useCallback } from 'react'

interface UseDraggableProps {
  direction: 'horizontal' | 'vertical'
  initialSize: number
  minSize: number
  maxSize: number
}

export function useDraggable({ direction, initialSize, minSize, maxSize }: UseDraggableProps) {
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)

  const startDragging = useCallback(() => {
    setIsDragging(true)
  }, [])

  const stopDragging = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newSize = direction === 'horizontal' ? e.clientX : e.clientY
        setSize((prevSize) => Math.min(Math.max(newSize, minSize), maxSize))
      }
    },
    [isDragging, direction, minSize, maxSize]
  )

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', stopDragging)
    } else {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDragging)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDragging)
    }
  }, [isDragging, onMouseMove, stopDragging])

  return { size, startDragging }
}

