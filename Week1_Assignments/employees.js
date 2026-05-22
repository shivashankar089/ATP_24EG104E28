// Program to manage an array of employee objects and perform CRUD-like operations

// Define the initial list of employee records with ID, name, and marks
const employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
]

// 1. Insert a new employee record at index 2 (third position)
// The splice method arguments: (start_index, delete_count, item_to_insert)
employees.splice(2, 0, { eno: 106, name: "harish", marks: [90, 79, 88] })
console.log("After inserting Harish at index 2:")
console.log(employees)

// 2. Remove the employee record located at index 4
// The splice method arguments: (start_index, delete_count)
employees.splice(4, 1)
console.log("After removing the employee at index 4:")
console.log(employees)

// 3. Modify the third subject mark (index 2 in marks array) for Sneha
// We access the employee at index 3 and update their marks list
employees[3].marks[2] = 75
console.log("After changing Sneha's third subject mark to 75:")
console.log(employees)