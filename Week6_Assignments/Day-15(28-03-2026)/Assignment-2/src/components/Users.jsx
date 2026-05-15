import { useEffect, useState } from 'react'
import axios from 'axios'

function Users(props) {
  const [users, setUsers] = useState([])
  const [addedUsers, setAddedUsers] = useState([])

  useEffect(function () {
    async function getUsers() {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        )
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUsers()
  }, [])

  function handleClick(id) {
    if (addedUsers.includes(id)) return

    props.onAdd()
    setAddedUsers([...addedUsers, id])
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(function (user) {
          return (
            <div
              key={user.id}
              className="w-64 bg-white rounded-xl shadow-md p-5 text-center mx-auto"
            >
              <h5 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h5>

              <p className="text-gray-500 text-sm mb-4">{user.email}</p>

              <button
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
                onClick={() => handleClick(user.id)}
              >
                Add User
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users
