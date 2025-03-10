import useTop from "../../useTop"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"

const HomePage = () => {
  useTop()
  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}>
        <div className={styles.hello}>
          <h1>Welcome To Paradise Nursery</h1>
          <h2>Where Green Meets Serenity</h2>
          <Link to="/plants">
            <button className={styles.button}>Get Started</button>
          </Link>
        </div>
        <div>
          <p>
            At Paradise Nursery, we are passionate about bringing nature closer
            to you. Our mission is to provide a wide range of high-quality
            plants that not only enhance the beauty of your surroundings but
            also contribute to a healthier and more sustainable lifestyle.
          </p>
          <p>
            Join us in our mission to create a greener, healthier world. Visit
            Paradise Nursery today and experience the beauty of nature right at
            your doorstep.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
