import { useSelector, useDispatch } from "react-redux"
import type { CartItem, Product } from "../../store"
import { addToCart } from "../../store"
import styles from "./PlantsPage.module.css"
import { NavBar } from "../../NavBar"
import image from "../../plant.png"
import useTop from "../../useTop"

const PlantsPage = () => {
  useTop()
  const products: Product[] = useSelector(state => state.products)
  const cart: CartItem[] = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const groups = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.group]) {
      acc[product.group] = []
    }
    acc[product.group].push(product)
    return acc
  }, {})

  return (
    <div className={styles.plantsContainer}>
      <NavBar />
      {Object.entries(groups).map(([group, products]) => (
        <div className={styles.plantsContent} key={group}>
          <h2>{group}</h2>
          <div className={styles.productGrid}>
            {products.map(product => {
              const inCart = cart.some(item => item.product.id === product.id)
              return (
                <div key={product.id} className={styles.productCard}>
                  <h3>{product.name}</h3>
                  <img
                    className={styles.productImage}
                    src={image}
                    alt={product.name}
                  />
                  <p className={styles.price}>${product.price}</p>
                  <p className={styles.description}>{product.description}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={inCart}
                    className={inCart ? styles.addedButton : styles.addButton}
                  >
                    {inCart ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlantsPage
