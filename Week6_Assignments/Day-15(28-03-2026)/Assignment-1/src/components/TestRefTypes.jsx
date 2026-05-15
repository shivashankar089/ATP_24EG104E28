import { useState } from 'react'

const TestRefTypes = () => {
  const [user, setUser] = useState({ username: 'Ravi', age: 21, City: 'Hyd' })
  const [marks, setMarks] = useState([10, 20, 30])
  const updateUser = () => setUser({ ...user, username: 'Bhanu', age: 23 })
  const updateMarks = () => setMarks([...marks, 40])

  return (
    <div className="text-center mt-7">
      <p className="text-3xl">Username:{user.username}</p>
      <p className="text-3xl">Age:{user.age}</p>
      <p className="text-3xl">City:{user.City}</p>

      <button onClick={updateUser} className="text-3xl bg-amber-600 p-5">
        UpdateUser
      </button>

      {marks.map((mark) => (
        <p>{mark}</p>
      ))}
      <button onClick={updateMarks} className="text-3xl bg-amber-600 p-5">
        updateMarks
      </button>
    </div>
  )
}
export default TestRefTypes
