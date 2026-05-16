import { useLocation } from 'react-router'
function Employee() {
  //read state received from navigate
  const { state } = useLocation()

  return (
    <div className="p-12 text-center text-3xl rounded-2xl shadow-2xl w-3xl block mx-auto border bg-linear-to-r from-blue-100 via-blue-200 to-blue-400">
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.mobile}</p>
      <p>{state.designation}</p>
      <p>{state.companyName}</p>
    </div>
  )
}

export default Employee
