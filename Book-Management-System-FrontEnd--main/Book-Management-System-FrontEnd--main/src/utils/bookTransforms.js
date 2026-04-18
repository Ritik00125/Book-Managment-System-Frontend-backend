export const emptyBookForm = {
  name: "",
  author: "",
  edition: "",
  price: "",
  pages: "",
  totalCopies: 1,
  description: "",
};

export const toBookPayload = (book) => ({
  name: book.name.trim(),
  author: book.author.trim(),
  edition: book.edition.trim(),
  price: Number(book.price),
  pages: Number(book.pages),
  totalCopies: Number(book.totalCopies || 1),
  description: book.description.trim(),
});

export const toBookFormValues = (book) => ({
  name: book.name || "",
  author: book.author || "",
  edition: book.edition || "",
  price: book.price || "",
  pages: book.pages || "",
  totalCopies: book.totalCopies || 1,
  description: book.description || "",
});

export const formatBookStatus = (book) =>
  book.currentIssue ? "Issued" : "Available";

export const isOverdue = (book) =>
  Boolean(book.currentIssue?.dueDate) &&
  new Date(book.currentIssue.dueDate).getTime() < Date.now();
