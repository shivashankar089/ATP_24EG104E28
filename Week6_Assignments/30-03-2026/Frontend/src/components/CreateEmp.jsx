import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import BASE_URL from '../config'
function CreateEmp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onFormSubmit = async (newEmpObj) => {
    console.log(newEmpObj)
    try {
      setLoading(true)
      //Make http Post request
      const res = await axios.post(
        `${BASE_URL}/employee-api/employees`,
        newEmpObj
      )
      if (res.status === 201) {
        navigate('/list')
      } else {
        let errorRes = await res.json()
        throw new Error(errorRes)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-center text-4xl text-gray-600">Loading....</p>
  }
  if (error) {
    return <p className="text-center text-4xl text-red-400">{error.message}</p>
  }
  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600 mb-5">
        Create New Employee
      </h1>
      <form
        className="w-full max-w-md mx-auto"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          type="text"
          placeholder="Enter Name"
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
          Add Emp
        </button>
      </form>
    </div>
  )
}

export default CreateEmp
