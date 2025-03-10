import { configureStore } from "@reduxjs/toolkit"

// Action types
const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const UPDATE_QUANTITY = "UPDATE_QUANTITY"
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY"
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY"

export type Product = {
  id: number
  name: string
  price: number
  description: string
  group: string
}

export type CartItem = {
  product: Product
  quantity: number
}

// Action creators
export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  payload: product,
})
export const removeFromCart = (productId: number) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
})
export const updateQuantity = (productId: number, quantity: number) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
})
export const incrementQuantity = (productId: number) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
})
export const decrementQuantity = (productId: number) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
})

// Initial state with some example products
const initialState = {
  products: [
    // Air Purifying Plants
    {
      id: 1,
      name: "Snake Plant",
      price: 15,
      description: "Produces oxygen at night, improving air quality.",
      group: "Air Purifying Plants",
    },
    {
      id: 2,
      name: "Spider Plant",
      price: 12,
      description: "Filters formaldehyde and xylene from the air.",
      group: "Air Purifying Plants",
    },
    {
      id: 3,
      name: "Peace Lily",
      price: 18,
      description: "Removes mold spores and purifies the air.",
      group: "Air Purifying Plants",
    },
    {
      id: 4,
      name: "Boston Fern",
      price: 14,
      description: "A lush plant that helps remove toxins.",
      group: "Air Purifying Plants",
    },
    {
      id: 5,
      name: "Rubber Plant",
      price: 20,
      description: "Excellent for removing formaldehyde.",
      group: "Air Purifying Plants",
    },
    {
      id: 6,
      name: "Aloe Vera",
      price: 10,
      description: "Great for healing and improving indoor air.",
      group: "Air Purifying Plants",
    },

    // Aromatic Fragrant Plants
    {
      id: 7,
      name: "Lavender",
      price: 15,
      description: "Calming and relaxing scent.",
      group: "Aromatic Fragrant Plants",
    },
    {
      id: 8,
      name: "Jasmine",
      price: 12,
      description: "Sweet and romantic scent.",
      group: "Aromatic Fragrant Plants",
    },
    {
      id: 9,
      name: "Rosemary",
      price: 18,
      description: "Pine-like scent and great for cooking.",
      group: "Aromatic Fragrant Plants",
    },
    {
      id: 10,
      name: "Mint",
      price: 14,
      description: "Fresh and invigorating scent.",
      group: "Aromatic Fragrant Plants",
    },
    {
      id: 11,
      name: "Lemon Balm",
      price: 20,
      description: "Citrusy and uplifting scent.",
      group: "Aromatic Fragrant Plants",
    },
    {
      id: 12,
      name: "Hyacinth",
      price: 10,
      description: "Sweet and intense floral scent.",
      group: "Aromatic Fragrant Plants",
    },

    // Flowering Plants
    {
      id: 13,
      name: "Orchid",
      price: 25,
      description: "Beautiful and delicate flowers.",
      group: "Flowering Plants",
    },
    {
      id: 14,
      name: "Peace Lily",
      price: 22,
      description: "Large, lush leaves and white flowers.",
      group: "Flowering Plants",
    },
    {
      id: 15,
      name: "Anthurium",
      price: 28,
      description: "Heart-shaped red flowers.",
      group: "Flowering Plants",
    },
    {
      id: 16,
      name: "Bromeliad",
      price: 24,
      description: "Colorful and exotic tropical plant.",
      group: "Flowering Plants",
    },
  ] satisfies Product[],
  cart: [] as CartItem[],
}

// Reducer
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // If product is already in cart, do not add again
      const exists = state.cart.find(
        item => item.product.id === action.payload.id,
      )
      if (exists) {
        return state // No change if it’s already in cart
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      }
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: Number(quantity) }
            : item,
        ),
      }
    }
    case INCREMENT_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }
    }
    case DECREMENT_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item,
        ),
      }
    }
    default:
      return state
  }
}

// Create store

export const makeStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()
