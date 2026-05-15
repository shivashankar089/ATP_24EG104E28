import { useState } from 'react'
import Users from './components/Users'
import UserCount from './components/UserCount'

function App() {
  const [count, setCount] = useState(0)

  function handleAddUser() {
    setCount(count + 1)
  }

  return (
    <div className="block mx-auto mt-12 ">
      <h2 className="text-center mb-4">User Dashboard</h2>

      <UserCount count={count} />
      <Users onAdd={handleAddUser} />
    </div>
  )
}

export default App
