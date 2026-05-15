import { NavLink } from 'react-router'
function Header() {
  return (
    <nav className='flex justify-end text-2xl bg-gray-500 text-white gap-5 p-7'>
      <NavLink
        to=""
        className={({ isActive }) => isActive ? 'text-yellow-500' : ''}
      >Home</NavLink>
      <NavLink
        to="create-emp"
        className={({ isActive }) => isActive ? 'text-yellow-500' : ''}
      >CreateEmp</NavLink>
      <NavLink
        to="list"
        className={({ isActive }) => isActive ? 'text-yellow-500' : ''}
      >ListOFEmps</NavLink>
    </nav>
  )
}

export default Header
