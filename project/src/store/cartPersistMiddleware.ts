import type { Middleware } from '@reduxjs/toolkit'
import { saveCartToStorage } from './cartStorage'

const PERSIST_ACTIONS = new Set([
  'cart/addToCart',
  'cart/removeFromCart',
  'cart/clearCart',
  'cart/placeOrderSuccess',
])

export const cartPersistMiddleware: Middleware = store => next => action => {
  const result = next(action)
  if (typeof action === 'object' && action !== null && 'type' in action && PERSIST_ACTIONS.has(String(action.type))) {
    saveCartToStorage(store.getState().cart.items)
  }
  return result
}
