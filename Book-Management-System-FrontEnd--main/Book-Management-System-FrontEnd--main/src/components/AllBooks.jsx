import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AllBooks.css";
import img1 from "../assets/books-details.jpg";
import { deleteBookById, getBooks } from "../services/bookService";
import { formatBookStatus, isOverdue } from "../utils/bookTransforms";

const AllBooks = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBook, setFilterBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const booksPerPage = 5;

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response?.data || []);
      setFilterBook(response?.data || []);
    } catch {
      Swal.fire("Error!", "Failed to load books.", "error");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const filterBooks = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const records = books.filter(
      (book) =>
        book.name.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
    );

    setFilterBook(records);
    setCurrentPage(1);
  };

  const deleteBook = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteBookById(id);
      const updatedBooks = books.filter((book) => book._id !== id);
      setBooks(updatedBooks);
      setFilterBook(updatedBooks);
      Swal.fire("Deleted!", "The book has been deleted.", "success");
    } catch {
      Swal.fire("Error!", "Failed to delete the book.", "error");
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filterBook.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filterBook.length / booksPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="container-fluid my-5 animate__animated animate__fadeIn">
      <section className="hero-section text-center py-5 px-3">
        <div className="container">
          <h1 className="display-5 fw-semibold text-success">
            Find Every Series, Every Book, Every Author
            <br /> in Perfect Sequence
          </h1>
          <p className="lead text-dark mt-3">
            Browse the catalog, inspect availability, and jump straight into circulation operations.
          </p>
          <img
            src={img1}
            alt="Books Banner"
            className="img-fluid mt-4 shadow rounded hero-image"
          />
        </div>
      </section>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 shadow-sm"
          placeholder="Search book by title or author..."
          value={searchText}
          onChange={filterBooks}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped border rounded shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Edition</th>
              <th>Status</th>
              <th>Copies</th>
              <th>Price (Rs)</th>
              <th>Pages</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => (
                <tr key={book._id} className="align-middle">
                  <td>{indexOfFirstBook + index + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>
                    <span
                      className={`badge ${
                        isOverdue(book)
                          ? "text-bg-danger"
                          : book.currentIssue
                            ? "text-bg-warning"
                            : "text-bg-success"
                      }`}
                    >
                      {isOverdue(book) ? "Overdue" : formatBookStatus(book)}
                    </span>
                  </td>
                  <td>
                    {book.availableCopies}/{book.totalCopies}
                  </td>
                  <td>{book.price}</td>
                  <td>{book.pages}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>
                    {book.description}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => navigate(`/edit-books/${book._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteBook(book._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-dark ms-2"
                      onClick={() => navigate("/issue-return")}
                    >
                      <FaArrowRight />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted py-4">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((num) => (
              <li
                key={num}
                className={`page-item ${currentPage === num ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AllBooks;
