import { useState, useEffect } from 'react'

export default function APIDemo() {
  /* let [count, setCount] = useState(100)
  const changeState = () => {
    setCount(count + 1)
  } */
  let [Users, setUsers] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(null)
  useEffect(() => {
    console.log('API Demo rendered')

    //a function to make api request
    async function getData() {
      setLoading(true)
      try {
        let res = await fetch('https://jsonplaceholder.typicode.com/posts')
        let usersList = await res.json()
        setUsers(usersList)
      } catch (err) {
        console.log('Error is ', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])
  if (loading) {
    return <p className="text-center text-5xl">Loading...</p>
  }
  if (error !== null) {
    return <p className="text-center text-red-500 text-5xl">{error.message}</p>
  }

  console.log('API Demo rendered')
  return (
    <div className="text-center mt-10">
      <h1 className="text-8xl text-blue-500 mb-9">List of Users</h1>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Users.map((userObj) => (
          <div
            key={userObj.id}
            className="text-center border-2 rounded-3xl p-3 shadow-2xl"
          >
            <p>{userObj.title}</p>
            <p>{userObj.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
