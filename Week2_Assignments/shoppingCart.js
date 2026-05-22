// Shopping Cart Management program demonstrating advanced array helper functions

const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

// 1. Reduce: Calculate the cumulative total price of all items in the cart
let totalValue = cart.reduce((curr, prev) => curr + prev.price, 0);
console.log("Total price:", totalValue);

// 2. Find: Search and retrieve the full details of the item named "Mouse"
let detailsOfMouse = cart.find(item => item.name === "Mouse");
console.log("Details of Mouse:", detailsOfMouse);

// 3. FindIndex: Locate the index of the "Keyboard" item in the array
let positionOfKeyboard = cart.findIndex(elem => elem.name === "Keyboard");
console.log("Position of Keyboard in array index:", positionOfKeyboard);

// 4. Map: Generate a new array of objects representing mapped item details with computed totalPrice (price * quantity)
let insert = cart.map(element => {
    return {
        name: element.name,
        totalPrice: element.price * element.quantity
    };
});
console.log("Calculated item totals:", insert);

// 5. Filter: Extract only the items that are currently marked as inStock (inStock === true)
let inn = cart.filter(available => available.inStock === true);
console.log("Available in-stock items:", inn);
