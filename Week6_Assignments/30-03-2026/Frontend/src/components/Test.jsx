import { useContext } from 'react'
import { counterContextObj } from '../contexts/ContextProvider'
import { useCounterStore } from '../store/CounterStore'
function Test() {
  console.log('Test')
  const { counter1, changeCounter1 } = useContext(counterContextObj)
  const newCounter1 = useCounterStore((state) => state.newCounter1)
  const incrementCounter1 = useCounterStore((state) => state.incrementCounter1)
  const decrementCounter1 = useCounterStore((state) => state.decrementCounter1)
  return (
    <div>
      <h1 className="text-4xl">Counter:{counter1}</h1>
      <button onClick={changeCounter1} className="p-4 bg-amber-300">
        Change
      </button>
      <h1 className="text-4xl">New Counter:{newCounter1}</h1>
      <button onClick={incrementCounter1} className="p-4 bg-amber-300 mr-5">
        +
      </button>
      <button onClick={decrementCounter1} className="p-4 bg-amber-300">
        -
      </button>
    </div>
  )
}

export default Test
