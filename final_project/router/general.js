const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const user = req.body.user;
  const username = user.username;
  const password = user.password
 // if(user.password)
  //{
   // password = user.password;
  //}
  //const password = user.password;
  if(!username || !password)
  {
      let errorMsg = "Error: missing ";
      if(!username) errorMsg = errorMsg + "[User Name] ";
      if(!password) errorMsg = errorMsg + "[Password]";
      return res.status(300).json({message: errorMsg});
  }

  let filtered_users = users.filter((user) => user.username === username);
  if(filtered_users.length > 0)
  {
    let errorMsg = "Error: user " + username + " already exists";
    return res.status(300).json({message: errorMsg});
  }

  users.push(user);
  let successMsg = "User " + username + " successfully registered";
  //
    res.send(successMsg);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented "});
  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = parseInt(req.params.isbn);
   // let filtered_books = books.filter((book) => book.isbn === isbn);
  //return res.status(300).json({message: "Yet to be implemented" + JSON.stringify(books[isbn])});
  res.send(books[isbn]);
  //res.send(JSON.stringify({books[isbn]}, null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookList = Object.values(books);
  let filtered_books_by_author = bookList.filter((book) => book.author === author);
  res.send(filtered_books_by_author);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;
  const bookList = Object.values(books);
  let filtered_books_by_title = bookList.filter((book) => book.title === title);
  res.send(filtered_books_by_title);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send(books[isbn].reviews);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
