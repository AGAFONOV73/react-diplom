import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import cartReducer, { initialCartState } from './cartSlice'
import { cartPersistMiddleware } from './cartPersistMiddleware'
import { loadCartFromStorage } from './cartStorage'
import shopReducer from './shopSlice'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      ...initialCartState,
      items: loadCartFromStorage(),
    },
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(cartPersistMiddleware, sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch