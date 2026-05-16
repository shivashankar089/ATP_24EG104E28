import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const counterContextObj = createContext()

function ContextProvider({ children }) {
  const [counter, setCounter] = useState(0)
  const [counter1, setCounter1] = useState(10)
  //functions to change state
  const changeCounter = () => {
    setCounter(counter + 1)
  }
  const changeCounter1 = () => {
    setCounter1(counter1 + 1)
  }
  return (
    <counterContextObj.Provider
      value={{ counter, counter1, changeCounter, changeCounter1 }}
    >
      {children}
    </counterContextObj.Provider>
  )
}

export default ContextProvider
