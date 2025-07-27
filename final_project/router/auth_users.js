const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let filetered_users = users.filter((user) => user.username == username);
    if(filetered_users.length > 0)
    {
        return true;
    }
    return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let filetered_users = users.filter((user) => user.username == username);

    if (filetered_users.length > 0 && filetered_users[0].password === password)
    {
        return true;
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Error, no body" });
    }
     if (!user.username || !isValid(user.username)) {
        return res.status(404).json({ message: "Invalid user" });
    }   

    if(!user.password || !authenticatedUser(user.username, user.password))
    {
        return res.status(404).json({ message: "Invalid password for " + user.username });
    }

    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const isbn = parseInt(req.params.isbn);
  //let allReviews = books[isbn].reviews;
  //let filteredReviews = allReviews.filter((user) => user.username == username);
  //res.send(books[isbn].reviews);
   return res.status(300).json({message: req.session.authorization.data + "wants a book"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;