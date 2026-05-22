// Student Dashboard analysis demonstrating arrays of objects, map, filter, reduce, find, and findIndex

const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

// 1. Filter: Retrieve all students who passed the exam (marks >= 40)
let result = students.filter(function(stuobj) {
    return stuobj.marks >= 40;
});
console.log("Passing Students (marks >= 40):", result);

// 2. Map: Assign and return letter grades corresponding to students' marks ranges
let r1 = students.map(function(stuobj) {
    if (stuobj.marks >= 90) {
        return 'A';
    } else if (stuobj.marks >= 75 && stuobj.marks < 90) {
        return 'B';
    } else if (stuobj.marks >= 60 && stuobj.marks < 75) {
        return 'C';
    } else {
        return 'D';
    }
});
console.log("Evaluated Student Grades:", r1);

// 3. Reduce: Sum student marks and calculate their average marks
let r2 = students.reduce((acc, stuobj) => acc + stuobj.marks, 0);
let avg = r2 / students.length;
console.log("Average Marks of all students:", avg);

// 4. Find: Locate the first student object who scored exactly 92
let r3 = students.find(stuobj => stuobj.marks == 92);
console.log("Student with marks 92:", r3);

// 5. FindIndex: Locate the index of the student named "Kiran"
let r4 = students.findIndex(stuobj => stuobj.name == "Kiran");
console.log("Index of Kiran in the array:", r4);