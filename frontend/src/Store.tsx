import React from 'react'
import { Cart, CartItem } from './types/Cart'

type AppState = {
  mode: string
  cart: Cart
}

const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefer-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  cart: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')!
      : 'GPay',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
    case 'CART_ADD_ITEM':
      // eslint-disable-next-line no-case-declarations
      const newItem = action.payload
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      )
      // eslint-disable-next-line no-case-declarations
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

// eslint-disable-next-line @typescript-eslint/ban-types
function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
