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
        throw new Error(res.data?.message || 'Error occurred')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-center text-4xl text-gray-600">Loading....</p>
  }
  if (error) {
    return <p className="text-center text-4xl text-red-400">{error}</p>
  }
  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-8">
          Create New Employee
        </h1>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              {...register('name')}
              id="name"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="text"
              placeholder="e.g. jane@example.com"
              {...register('email')}
              id="email"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number</label>
            <input
              type="text"
              placeholder="e.g. +1 234 567 890"
              {...register('mobile')}
              id="mobile"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-semibold text-slate-700 mb-1">Designation</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              {...register('designation')}
              id="designation"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="e.g. TechCorp Inc."
              {...register('companyName')}
              id="companyName"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3.5 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEmp
