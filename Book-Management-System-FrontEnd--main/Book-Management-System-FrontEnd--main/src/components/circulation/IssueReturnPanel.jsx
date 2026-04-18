import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCirculationOverview, getBooks, issueBook, returnBook } from "../../services/bookService";
import { formatBookStatus, isOverdue } from "../../utils/bookTransforms";
import "./IssueReturnPanel.css";

const defaultIssueForm = {
  bookId: "",
  borrowerName: "",
  borrowerEmail: "",
  dueDate: "",
  notes: "",
};

const IssueReturnPanel = () => {
  const [books, setBooks] = useState([]);
  const [overview, setOverview] = useState(null);
  const [issueForm, setIssueForm] = useState(defaultIssueForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const [booksResponse, overviewResponse] = await Promise.all([
        getBooks(),
        getCirculationOverview(),
      ]);

      setBooks(booksResponse.data || []);
      setOverview(overviewResponse.data);
    } catch {
      Swal.fire("Error", "Failed to load circulation data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const availableBooks = books.filter((book) => !book.currentIssue);

  const handleIssueChange = (event) => {
    const { name, value } = event.target;
    setIssueForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleIssueSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await issueBook(issueForm.bookId, {
        borrowerName: issueForm.borrowerName,
        borrowerEmail: issueForm.borrowerEmail,
        dueDate: issueForm.dueDate,
        notes: issueForm.notes,
      });

      setIssueForm(defaultIssueForm);
      await loadData();
      Swal.fire("Issued", "Book issued successfully.", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to issue book.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId);
      await loadData();
      Swal.fire("Returned", "Book returned successfully.", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to return book.", "error");
    }
  };

  if (isLoading) {
    return <div className="container py-5">Loading circulation data...</div>;
  }

  return (
    <div className="circulation-shell container py-5">
      <div className="circulation-hero mb-4">
        <p className="eyebrow">Issue & Return System</p>
        <h1>Library circulation that behaves like an actual operational module.</h1>
        <p className="subtitle">
          Issue books, track the active borrower, monitor overdue items, and keep availability accurate.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <span>Total Titles</span>
            <strong>{overview?.summary?.totalBooks ?? 0}</strong>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <span>Total Copies</span>
            <strong>{overview?.summary?.totalCopies ?? 0}</strong>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <span>Issued Books</span>
            <strong>{overview?.summary?.issuedBooks ?? 0}</strong>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card danger">
            <span>Overdue</span>
            <strong>{overview?.summary?.overdueBooks ?? 0}</strong>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="panel-card h-100">
            <h2>Issue a book</h2>
            <p className="text-muted">Assign an available title to a borrower with a due date.</p>

            <form onSubmit={handleIssueSubmit}>
              <div className="mb-3">
                <label className="form-label">Book</label>
                <select
                  className="form-select"
                  name="bookId"
                  value={issueForm.bookId}
                  onChange={handleIssueChange}
                  required
                >
                  <option value="">Select a book</option>
                  {availableBooks.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.name} by {book.author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Borrower Name</label>
                <input
                  className="form-control"
                  name="borrowerName"
                  value={issueForm.borrowerName}
                  onChange={handleIssueChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Borrower Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="borrowerEmail"
                  value={issueForm.borrowerEmail}
                  onChange={handleIssueChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={issueForm.dueDate}
                  onChange={handleIssueChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="notes"
                  value={issueForm.notes}
                  onChange={handleIssueChange}
                />
              </div>

              <button className="btn btn-dark w-100" disabled={isSubmitting}>
                {isSubmitting ? "Issuing..." : "Issue Book"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="panel-card h-100">
            <h2>Active issues</h2>
            <p className="text-muted">Current borrower records and return actions.</p>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Borrower</th>
                    <th>Status</th>
                    <th>Due</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(overview?.activeIssues || []).length > 0 ? (
                    overview.activeIssues.map((book) => (
                      <tr key={book._id}>
                        <td>
                          <div className="fw-semibold">{book.name}</div>
                          <small className="text-muted">{book.author}</small>
                        </td>
                        <td>
                          <div>{book.currentIssue.borrowerName}</div>
                          <small className="text-muted">{book.currentIssue.borrowerEmail || "No email"}</small>
                        </td>
                        <td>
                          <span className={`status-badge ${isOverdue(book) ? "overdue" : "active"}`}>
                            {isOverdue(book) ? "Overdue" : formatBookStatus(book)}
                          </span>
                        </td>
                        <td>{new Date(book.currentIssue.dueDate).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => handleReturn(book._id)}
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No active issues.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueReturnPanel;
