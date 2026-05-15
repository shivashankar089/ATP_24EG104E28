function User(props) {
  const { userObj } = props
  return (
    <div className="border-2 border -[#0284C7] p-4 rounded-4xl p-10 shadow-lg bg-gradient-to-br from-sky-400 to-indigo-500">
      <img className="m-auto mb-5 rounded-4xl ring-2" src={userObj.image} alt="Image not found" />
      <h2 className=" align-middle font-bold ">{userObj.name}</h2>
      <p className="font-bold">{userObj.email}</p>
    </div>
  )
}
export default User
