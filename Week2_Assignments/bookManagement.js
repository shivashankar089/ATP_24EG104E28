// Book Management system illustrating ES6 classes, properties, constructors, and methods

class Book {
    // Class properties (fields)
    title;
    author;
    pages;
    isavailable = true; // Default availability status

    constructor(title, author, pages, isavailable) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        // If isavailable parameter is provided, use it; otherwise defaults to true
        if (isavailable !== undefined) {
            this.isavailable = isavailable;
        }
    }

    borrow() {
        if (!this.isavailable) {
            return "unavailable";
        }
        this.isavailable = false; // Mark as borrowed
        return "successfully borrowed";
    }

    returnBook() {
        if (this.isavailable) {
            return "Available";
        }
        this.isavailable = true; // Mark as available again
        return "successfully returned";
    }

    getInfo() {
        return (`${this.title} is by ${this.author} of pages ${this.pages}`);
    }

    isLongBook() {
        if (this.pages > 300) {
            return true;
        } else {
            return false;
        }
    }
}

// Create instances of the Book class
let b1 = new Book("Indain Polity", "Laxmikanth", 310);
let b2 = new Book("Constitution Of India", "DD BASU", 260);
let b3 = new Book("Modern Indian History", "Rs Sharma", 160, false);
let b4 = new Book("The Medieval History", "Bipin Chandra", 360);
let b5 = new Book("The Insider", "PV Narasimha Rao", 70, false);

// Print book info
console.log(b1.getInfo());
console.log(b2.getInfo());
console.log(b3.getInfo());
console.log(b4.getInfo());
console.log(b5.getInfo());

// Test borrowing books
console.log("Borrowing b3 (already unavailable):", b3.borrow());
console.log("Borrowing b4 (available):", b4.borrow());