const Books = require("../model/Book");

const ReturnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Book not found",
      });
    }

    if (!book.currentIssue) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Book is not currently issued",
      });
    }

    const activeIssue = book.issueHistory.id(book.currentIssue.issueRecordId);

    if (activeIssue) {
      activeIssue.returnedAt = new Date();
    }

    book.currentIssue = null;
    book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);

    await book.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Book returned successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to return book",
    });
  }
};

module.exports = ReturnBook;
