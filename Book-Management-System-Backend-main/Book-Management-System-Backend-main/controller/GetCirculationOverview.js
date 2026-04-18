const Books = require("../model/Book");

const GetCirculationOverview = async (req, res) => {
  try {
    const books = await Books.find({}).sort({ updatedAt: -1 });

    const issuedBooks = books.filter((book) => Boolean(book.currentIssue));
    const totalBooks = books.length;
    const totalCopies = books.reduce((sum, book) => sum + book.totalCopies, 0);
    const availableCopies = books.reduce(
      (sum, book) => sum + book.availableCopies,
      0
    );

    const overdueBooks = issuedBooks.filter(
      (book) => new Date(book.currentIssue.dueDate) < new Date()
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Circulation overview fetched successfully",
      data: {
        summary: {
          totalBooks,
          totalCopies,
          availableCopies,
          issuedBooks: issuedBooks.length,
          overdueBooks: overdueBooks.length,
        },
        activeIssues: issuedBooks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to fetch circulation overview",
    });
  }
};

module.exports = GetCirculationOverview;
