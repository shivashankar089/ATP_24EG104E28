import { useState } from 'react'
function Counter() {
  //state
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset=(value)=> setCount(value)
  return (
    <div className="text-center p-10 border">
      <h1 className="text-8xl text-center mb-10">Count:{count}</h1>
      <button className="bg-green-500 p-7 mx-6" onClick={increment}>
        +
      </button>
      <button className="bg-red-500 p-7 mx-1" onClick={decrement}>
        -
      </button>
      <button className="bg-orange-500 p-7 mx-1" onClick={()=>reset(0)}>
        rest
      </button>
    </div>
  )
}

export default Counter
