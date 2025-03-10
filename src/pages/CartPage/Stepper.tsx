import styles from "./Stepper.module.css"

type StepperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

const Stepper: React.FC<StepperProps> = ({
  value,
  onIncrement,
  onDecrement,
  onQuantityChange,
  min = 1,
  max = 99,
  disabled = false,
  ...rest
}) => {
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)

    if (isNaN(newValue)) {
      onQuantityChange(min)
      return
    }

    if (newValue < min) {
      onQuantityChange(min)
    } else if (newValue > max) {
      onQuantityChange(max)
    } else {
      onQuantityChange(newValue)
    }
  }

  return (
    <div className={styles.row} {...rest}>
      <button
        className={styles.button}
        onClick={onDecrement}
        disabled={value <= min || disabled}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={handleManualInput}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Item quantity"
      />
      <button
        className={styles.button}
        onClick={onIncrement}
        disabled={value >= max || disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

export default Stepper
