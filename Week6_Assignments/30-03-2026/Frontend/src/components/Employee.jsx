import { useLocation, useNavigate } from 'react-router'
function Employee() {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32 flex items-center justify-center relative">
        <div className="absolute -bottom-12 w-24 h-24 bg-white text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-md">
          {state?.name ? state.name.charAt(0).toUpperCase() : '?'}
        </div>
      </div>
      <div className="pt-16 pb-8 px-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-1">{state.name}</h2>
        <p className="text-indigo-600 font-semibold mb-6">{state.designation}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left border-t border-slate-100 pt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Email</p>
            <p className="text-slate-800 font-medium break-words">{state.email}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Mobile</p>
            <p className="text-slate-800 font-medium">{state.mobile}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Company</p>
            <p className="text-slate-800 font-medium">{state.companyName}</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/list')}
          className="mt-8 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg inline-block"
        >
          Back to List
        </button>
      </div>
    </div>
  )
}

export default Employee
