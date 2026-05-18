import { NavLink } from 'react-router'

function Header() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm flex items-center justify-between px-8 py-4">
      <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
        EmpManage<span className="text-slate-800">.</span>
      </div>
      <div className="flex gap-6 text-lg font-medium">
        <NavLink
          to=""
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-indigo-600 ${
              isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="create-emp"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-indigo-600 ${
              isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'
            }`
          }
        >
          Create Employee
        </NavLink>
        <NavLink
          to="list"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-indigo-600 ${
              isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'
            }`
          }
        >
          Employees List
        </NavLink>
      </div>
    </nav>
  )
}

export default Header
