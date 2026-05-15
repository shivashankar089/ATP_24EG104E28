function Navbar() {
  return (
    <nav className="flex justify-between bg-[#0F172A]">
      <h2 className="p-6 font-bold text-[#38BDF8] ">Logo</h2>
      <ul className="flex gap-25 p-6 font-bold text-[#E2E8F0]">
        <li><a href="">Home</a></li>
        <li><a href="">Signup</a></li>
        <li><a href="">Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
