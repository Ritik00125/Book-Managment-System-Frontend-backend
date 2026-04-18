const express = require("express");
const Books = require("../model/Book");
const AddBook = require("../controller/AddBook");
const GetallBooks = require("../controller/GetallBooks");
const findBookById = require("../controller/findBookById");
const updateBookDetail = require("../controller/updateBookDetail");
const deleteBook = require("../controller/deleteBook");
const IssueBook = require("../controller/IssueBook");
const ReturnBook = require("../controller/ReturnBook");
const GetCirculationOverview = require("../controller/GetCirculationOverview");
const SignUp = require("../controller/User/Signup");
const Login = require("../controller/User/Login");
const verifyUser = require("../middleWare/AuthMiddleWare");
const getAllUser = require("../controller/User/getAllUser");
const AuthMiddleWare = require("../controller/User/VerifyUser");
const contact = require("../controller/Contact/contact");

const router = express.Router();


//user Router 
router.post("/signup" , SignUp);
router.post("/login" , Login);
router.get("/verify-user",  verifyUser)
router.get("/get-all-user" , getAllUser);

//CRUD Operations are performing here 
router.post("/books" , AddBook);
router.get("/get-book-details" , GetallBooks);
router.get("/books/circulation/overview", GetCirculationOverview);
router.get("/get-book-by-id/:id" , findBookById)
router.put("/update-book-detail/:id" , updateBookDetail)
router.patch("/books/:id/issue", IssueBook);
router.patch("/books/:id/return", ReturnBook);
router.delete("/delete-book/:id" , deleteBook)

//api end point for 
router.post("/contact" , contact);

module.exports = router;
