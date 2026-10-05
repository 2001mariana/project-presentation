import { useState } from 'react'

export default function Count() {
  const [count, setCount] = useState(0)
  const color = count > 10 ? 'red' : 'blue'

  return (  
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <p style={{ color }}>{`The current color is ${color}`}</p>
      </section>
  )
}

