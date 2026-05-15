import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function CreateUsers() {
  const [users, setUsers] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onFormSubmit = (data) => {
    setUsers([...users, data])
  }

  return (
    <div className="bg-blue-400 min-h-screen p-5">
      <h1 className="text-4xl text-center">Create User Form</h1>

      {/* FORM */}
      <form
        className="max-w-md mx-auto mt-10 bg-orange-300 p-5"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {/* FirstName */}
        <div className="mb-3">
          <label>FirstName</label>
          <input
            type="text"
            {...register('FirstName', {
              required: 'FirstName required',
              validate: (v) =>
                v.trim().length !== 0 || 'White space is not valid',
              minLength: {
                value: 4,
                message: 'Min length is 4'
              },
              maxLength: {
                value: 10,
                message: 'Max length is 10'
              }
            })}
            className="border w-full p-2"
          />

          {errors.FirstName && (
            <p className="text-red-500">{errors.FirstName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email format'
              }
            })}
            className="border w-full p-2"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            {...register('dateOfBirth', {
              required: 'Date of Birth required'
            })}
            className="border w-full p-2"
          />

          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <button className="bg-pink-500 p-2 block mx-auto">Add User</button>
      </form>

      {/* USERS LIST */}
      <h1 className="text-3xl text-center mt-6">Users List</h1>

      <div className="max-w-md mx-auto mt-5 bg-red-300 p-4">
        {/* Header */}
        <div className="flex justify-between font-bold border-b pb-2">
          <span>Name</span>
          <span>Email</span>
          <span>DOB</span>
        </div>

        {/* Data */}
        {users.map((user, index) => (
          <div key={index} className="flex justify-between mt-2 border-b pb-1">
            <span>{user.FirstName}</span>
            <span>{user.email}</span>
            <span>{user.dateOfBirth}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
