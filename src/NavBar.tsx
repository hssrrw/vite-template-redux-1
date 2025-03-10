import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useSelector } from "react-redux"
import type { CartItem } from "./store"
import logoImage from "./logo.png"

export const NavBar = () => {
  const cart: CartItem[] = useSelector(state => state.cart)
  return (
    <nav className={styles.nav}>
      <div className={styles.spread}>
        <Link to="/" className={styles.title}>
          <div className={styles.logo}>
            <img src={logoImage} alt="logo" />
          </div>
          <div>
            <h1>Paradise Nursery</h1>
            <h2>Where Green Meets Serenity</h2>
          </div>
        </Link>
      </div>
      <Link to="/plants" className={styles.navLink}>
        Plants
      </Link>
      <div className={styles.spread}>
        <Link to="/cart" className={styles.cart}>
          <span>{cart.length}</span>
        </Link>
      </div>
    </nav>
  )
}
