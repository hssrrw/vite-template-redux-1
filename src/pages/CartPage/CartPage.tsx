import { useSelector, useDispatch } from "react-redux"
import {
  decrementQuantity,
  incrementQuantity,
  updateQuantity,
  removeFromCart,
  type CartItem,
} from "../../store"
import { Link } from "react-router-dom"
import styles from "./CartPage.module.css"
import Stepper from "./Stepper"
import { NavBar } from "../../NavBar"
import image from "../../plant.png"
import useTop from "../../useTop"

const CartPage = () => {
  useTop()
  const cart: CartItem[] = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id))
  }

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id))
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity(id, quantity))
  }

  const totalAmount = cart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  )

  const totalPlants = cart.reduce((acc, { quantity }) => acc + quantity, 0)

  return (
    <div>
      <NavBar />
      <div className={styles.cartContainer}>
        <h2>Total Cost: ${totalAmount}</h2>
        <h3>Total number of plants: {totalPlants}</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(({ product, quantity }) => (
            <div key={product.id} className={styles.productCard}>
              <img
                className={styles.productImage}
                src={image}
                // src={product.image}
                alt={product.name}
              />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <Stepper
                  value={quantity}
                  onIncrement={() => handleIncrement(product.id)}
                  onDecrement={() => handleDecrement(product.id)}
                  onQuantityChange={quantity =>
                    handleQuantityChange(product.id, quantity)
                  }
                />
                <p className={styles.total}>
                  Total: ${product.price * quantity}
                </p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleRemove(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        <div className={styles.cartSummary}>
          <Link to="/plants">
            <button className={styles.button}>Continue Shopping</button>
          </Link>
          <button
            className={styles.button}
            onClick={() => alert("Coming Soon")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
