import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import BASE_URL from '../config'
function EditEmployee() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  useEffect(() => {
    setValue('name', state.name)
    setValue('email', state.email)
    setValue('mobile', state.mobile)
    setValue('designation', state.designation)
    setValue('companyName', state.companyName)
  })
  const saveModifiedEmp = async (modifiedEmp) => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.put(
        `${BASE_URL}/employee-api/employees/${state._id}`,
        modifiedEmp
      )
      if (res.status === 200) {
        navigate('/list')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return <p className="text-center text-3xl">Saving...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }
  return (
    <div>
      <h1 className="text-5xl text-center mb-5 text-yellow-600">
        Edit Employee
      </h1>
      <form
        className="w-full max-w-md mx-auto"
        onSubmit={handleSubmit(saveModifiedEmp)}
      >
        <input
          type="text"
          placeholder="Enter name"
          {...register('name')}
          id="name"
          className=" mb-3 p-3 rounded-2xl border w-full shadow-2xl"
        />
        <input
          type="text"
          placeholder="Enter Email"
          {...register('email')}
          id="email"
          className=" mb-3 p-3 rounded-2xl border w-full shadow-2xl"
        />
        <input
          type="text"
          placeholder="Enter Mobile"
          {...register('mobile')}
          id="mobile"
          className=" mb-3 p-3 rounded-2xl border w-full shadow-2xl"
        />
        <input
          type="text"
          placeholder="Enter Designation"
          {...register('designation')}
          id="designation"
          className=" mb-3 p-3 rounded-2xl border w-full shadow-2xl"
        />
        <input
          type="text"
          placeholder="Enter Company Name"
          {...register('companyName')}
          id="companyName"
          className=" mb-3 p-3 rounded-2xl border w-full shadow-2xl"
        />
        <button
          type="submit"
          className="text-2xl text-white bg-gray-700 p-3 rounded-2xl block mx-auto"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditEmployee
