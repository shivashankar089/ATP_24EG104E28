// Movie Catalog Analysis demonstrating array operations (filter, map, reduce, findIndex)

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

// 1. Filter: Retrieve all Sci-Fi movies
let r1 = movies.filter(movie => movie.genre == "Sci-Fi");
console.log("Sci-Fi Movies:", r1);

// 2. Map: Map each movie to a boolean indicating whether its rating is exactly 8.8
let r2 = movies.map(movie => movie.rating == 8.8);
console.log("Rating matches 8.8? (mapped to boolean):", r2);

// 3. Reduce: Accumulate ratings to calculate the average movie rating
let r3 = movies.reduce((acc, movie) => acc + movie.rating, 0);
let avg = r3 / movies.length;
console.log("Average movie rating:", avg);

// 4. FindIndex: Get the index of the movie titled "Avengers"
let r4 = movies.findIndex(movie => movie.title == "Avengers");
console.log("Index of Avengers in the array:", r4);