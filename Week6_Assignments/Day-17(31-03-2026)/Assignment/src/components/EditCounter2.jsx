import { useContext } from 'react'
import { counterContextObj } from '../contexts/ContextProvider'
function EditCounter2() {
  const { counter, increment, decrement } = useContext(counterContextObj)
  return (
    <div className='text-center'>
      <h1 className='text-4xl'>Edit Counter 2</h1>
      <h1 className="text-4xl">{counter}</h1>
      <button onClick={increment} className="p-3 bg-green-500 m-3">
        +
      </button>
      <button onClick={decrement} className="p-3 bg-red-500 m-3">
        -
      </button>
    </div>
  )
}

export default EditCounter2
