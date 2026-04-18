import { useEffect, useState } from "react";
import { FaBook, FaFileAlt, FaLayerGroup, FaMoneyBillWave, FaPlusCircle, FaUserEdit } from "react-icons/fa";

const BookForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  title,
  subtitle,
}) => {
  const [book, setBook] = useState(initialValues);

  useEffect(() => {
    setBook(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-9">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-dark text-white py-4">
              <h2 className="mb-1 fw-bold">{title}</h2>
              <p className="mb-0 text-white-50">{subtitle}</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <FaBook className="me-2" />
                    Book Name
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="name"
                    value={book.name}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <FaUserEdit className="me-2" />
                    Author Name
                  </label>
                  <input
                    className="form-control form-control-lg"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      <FaFileAlt className="me-2" />
                      Edition
                    </label>
                    <input
                      className="form-control form-control-lg"
                      name="edition"
                      value={book.edition}
                      onChange={handleChange}
                      placeholder="e.g. 3rd Edition"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      <FaMoneyBillWave className="me-2" />
                      Price (Rs)
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="price"
                      value={book.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      <FaLayerGroup className="me-2" />
                      Total Copies
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="totalCopies"
                      value={book.totalCopies}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <FaFileAlt className="me-2" />
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    name="pages"
                    value={book.pages}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <FaFileAlt className="me-2" />
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="4"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    placeholder="Enter a short description"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100 rounded-pill"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : (
                    <>
                      <FaPlusCircle className="me-2" />
                      {submitLabel}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
