function Product(props) {
  //State
  const { productObj } = props
  //Return a react element
  return (
    <div className="border-2 p-4 rounded-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
      <h2 className="text-2xl align-middle font-bold ">{productObj.title}</h2>
      <p className="font-bold">{productObj.price}</p>
      <p className="font-mono">{productObj.description}</p>
    </div>
  )
}

export default Product
