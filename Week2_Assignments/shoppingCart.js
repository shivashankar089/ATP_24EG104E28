const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];


// total value of cart
let totalValue=cart.reduce((curr,prev)=>curr+prev.price,0)
console.log("Total price:",totalValue)

// finding a item with name
let detailsOfMouse=cart.find(item=>item.name==="Mouse")
console.log("Details of Mouse:",detailsOfMouse)

// finding index of a specific item
let positionOfKeyboard=cart.findIndex(elem=>elem.name==="Keyboard")
console.log("Postion of Keyboard:",positionOfKeyboard)

// using map and getting desired items and price
let insert=cart.map(element=>{
 return{
  name:element.name,
  totalPrice:element.price*element.quantity
 }})
console.log(insert)

//filtering inStock products
let inn=cart.filter(available=>available.inStock===true)
console.log(inn)
