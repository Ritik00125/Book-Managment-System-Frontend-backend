import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BookForm from "./books/BookForm";
import { createBook } from "../services/bookService";
import { emptyBookForm, toBookPayload } from "../utils/bookTransforms";

const AddBook = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (book) => {
    setIsSubmitting(true);

    try {
      await createBook(toBookPayload(book));
      await Swal.fire({
        title: "Success!",
        text: "Book added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/book-list");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookForm
      initialValues={emptyBookForm}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Add Book"
      title="Add New Book"
      subtitle="Create a catalog entry with stock and metadata ready for circulation."
    />
  );
};

export default AddBook;
