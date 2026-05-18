import Header from './Header'
import { Outlet } from 'react-router'
function RootLayout() {
  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
