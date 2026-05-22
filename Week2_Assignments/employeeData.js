// Employee Data Management demonstrating functional array methods (filter, map, reduce, find, findIndex)

const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. Filter: Retrieve all employees belonging to the "IT" department
let r1 = employees.filter(empobj => empobj.department == "IT");
console.log("IT Department Employees:", r1);

// 2. Map: Calculate and return a new array representing net salary (salary + 10% bonus)
let r2 = employees.map(empobj => empobj.salary + empobj.salary * 0.10);
console.log("Net Salaries (including 10% bonus):", r2);

// 3. Reduce: Calculate the total (aggregate) salary of all employees
let r3 = employees.reduce((acc, empobj) => acc + empobj.salary, 0);
console.log("Total Salary Expenditure:", r3);

// 4. Find: Retrieve the first employee object who has a salary of exactly 30000
let r4 = employees.find(empobj => empobj.salary == 30000);
console.log("Employee with salary 30000:", r4);

// 5. FindIndex: Locate the index of the employee named "Neha"
let r5 = employees.findIndex(emp => emp.name == "Neha");
console.log("Index of Neha in the list:", r5);