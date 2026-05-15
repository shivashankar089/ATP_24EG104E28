import React from 'react'

function UserCount(props) {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-64 bg-gray-100 rounded-xl shadow-md p-5 text-center">
        <h6 className="text-gray-500 mb-2">Users Added</h6>

        <h2 className="text-3xl font-bold text-gray-800">{props.count}</h2>
      </div>
    </div>
  )
}

export default UserCount
