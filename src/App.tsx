import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import PlantsPage from "./pages/PlantsPage/PlantsPage"
import CartPage from "./pages/CartPage/CartPage"
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App
