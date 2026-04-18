import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BookForm from "./books/BookForm";
import { getBookById, updateBook } from "../services/bookService";
import { emptyBookForm, toBookFormValues, toBookPayload } from "../utils/bookTransforms";

const EditBookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(emptyBookForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(toBookFormValues(response.data));
      } catch {
        Swal.fire("Error", "Failed to load book details.", "error");
      }
    };

    loadBook();
  }, [id]);

  const handleSubmit = async (values) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this book's details?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateBook(id, toBookPayload(values));
      await Swal.fire({
        title: "Updated!",
        text: "Book details have been updated successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
      navigate("/book-list");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong while updating.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookForm
      initialValues={book}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Update Book"
      title="Edit Book"
      subtitle="Update catalog details without breaking stock consistency."
    />
  );
};

export default EditBookDetail;
