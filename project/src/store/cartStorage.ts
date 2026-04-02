import type { CartItem } from '../types'

const STORAGE_KEY = 'ra16-cart'

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return []
    }
    return JSON.parse(stored) as CartItem[]
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
