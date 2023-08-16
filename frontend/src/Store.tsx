import React from 'react'
import { Cart, CartItem, ShippingAddress } from './types/Cart'
import { User } from './types/User'

type AppState = {
  mode: string
  cart: Cart
  userInfo?: User
}

const initialState: AppState = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

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
  | { type: 'CART_REMOVE_ITEM '; payload: CartItem }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNIN'; payload: User }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark')
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
    case 'CART_REMOVE_ITEM ': {
      // eslint-disable-next-line no-case-declarations
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }

    case 'USER_SIGNOUT':
      return {
        mode:
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        cart: {
          cartItems: [],
          paymentMethod: 'PayPal',
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }

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
