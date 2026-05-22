// Demonstrating Deep Copy in JavaScript using structuredClone()
// Unlike shallow copies, deep copying replicates all nested objects recursively.
// Changes to the nested properties of the copied object will not affect the original object.

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

// Create a deep copy of the 'order' object using structuredClone()
let dpcopy = structuredClone(order);

// Modifying nested address city on the copied object
dpcopy.customer.address.city = "Chennai";

// Modifying nested item price on the copied object
dpcopy.items[0].price = 80000;

// Printing Original Object - nested values remain Hyderabad and 70000
console.log("Original Order (Unmodified):", order);

// Printing Copied Object - nested values are Chennai and 80000
console.log("Deep Copied Order (Modified):", dpcopy);
