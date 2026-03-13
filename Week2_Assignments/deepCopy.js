
const order = {
     orderId: "ORD1001",
     customer: {
        name: "Anita",
        address: {
            city: "Hyderabad",
            pincode: 500085
             }
        },
      items: [
        { product: "Laptop", price: 70000 }
    ]
};
let dpcopy=structuredClone(order)
// Modifying the address
dpcopy.customer.address.city="Chennai"
// Modifying the price
dpcopy.items[0].price=80000
// Printing Original Object
console.log(order)
// Printing copied object
console.log(dpcopy)
