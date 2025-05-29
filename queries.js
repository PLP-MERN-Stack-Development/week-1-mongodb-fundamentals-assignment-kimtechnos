// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

//Find books published after a certain year (e.g., after 1950)
db.books.find({ published_year: { $gt: 1950 } });

//Find books by a specific author (e.g., "George Orwell")
db.books.find({ author: "George Orwell" });

//Update the price of a specific book (e.g., "1984")
db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });

// Delete a book by its title (e.g., "Animal Farm")
db.books.deleteOne({ title: "Animal Farm" });

//Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});

//Use projection to return only the title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

//Sort books by price (ascending)
db.books.find().sort({ price: 1 });

//Sort books by price (descending)
db.books.find().sort({ price: -1 });

//Implement pagination: 5 books per page (Page 1)
db.books.find().limit(5);

//Page 2 (Skip first 5, then get next 5)
db.books.find().skip(5).limit(5);

//Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
    },
  },
]);
// Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);
// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          {
            $toString: {
              $subtract: ["$published_year", { $mod: ["$published_year", 10] }],
            },
          },
          "s",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
]);
// Create an index on the title field
db.books.createIndex({ title: 1 });

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

//Use explain() to analyze performance
db.books.find({ title: "1984" }).explain("executionStats");


