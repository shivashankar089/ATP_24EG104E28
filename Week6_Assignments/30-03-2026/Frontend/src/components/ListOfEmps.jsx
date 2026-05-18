import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BASE_URL from '../config'
function ListOfEmps() {
  const [emps, setEmps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const goToEmployee = (empObj) => {
    navigate('/employee', { state: empObj })
  }
  const goTOEditEmployee = (empObj) => {
    navigate('/edit-employee', { state: empObj })
  }
  const deleteEmployeeById = async (empObj) => {
    try {
      setLoading(true)

      const res = await axios.delete(
        `${BASE_URL}/employee-api/employees/${empObj._id}`
      )

      if (res.status === 200) {
        getEmps()
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }
  async function getEmps() {
    try {
      setLoading(true)
      const res = await axios.get(`${BASE_URL}/employee-api/employees`)
      if (res.status === 200) {
        setEmps(res.data.payload)
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEmps()
  }, [])
  if (loading) {
    return <p className="text-center text-3xl">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-10">
        List of Employees
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {emps.map((empObj) => (
          <div
            key={empObj._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 p-6 flex flex-col group"
          >
            <div className="mb-4 text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                {empObj.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{empObj.name}</h2>
              <p className="text-sm text-slate-500 mt-1 break-words">{empObj.email}</p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between gap-2">
              <button
                className="flex-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 rounded-lg text-sm transition-colors"
                onClick={() => goToEmployee(empObj)}
              >
                View
              </button>
              <button
                className="flex-1 bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium py-2 rounded-lg text-sm transition-colors"
                onClick={() => goTOEditEmployee(empObj)}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 font-medium py-2 rounded-lg text-sm transition-colors"
                onClick={() => deleteEmployeeById(empObj)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfEmps
