import { useState, createContext } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const counterContextObj = createContext()

function ContextProvider({ children }) {
  const [counter, setCounter] = useState(0)
  //functions to change state
  const increment = () => {
    setCounter(counter + 1)
  }
  const decrement = () => {
    setCounter(counter - 1)
  }
  return (
    <counterContextObj.Provider value={{ counter, increment, decrement }}>
      {children}
    </counterContextObj.Provider>
  )
}

export default ContextProvider
