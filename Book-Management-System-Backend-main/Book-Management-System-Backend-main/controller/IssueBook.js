const Books = require("../model/Book");

const IssueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowerName, borrowerEmail, dueDate, notes } = req.body;

    if (!borrowerName || !dueDate) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Borrower name and due date are required",
      });
    }

    const book = await Books.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Book not found",
      });
    }

    if (book.currentIssue || book.availableCopies < 1) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Book is already issued",
      });
    }

    const normalizedDueDate = new Date(dueDate);

    if (Number.isNaN(normalizedDueDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Due date is invalid",
      });
    }

    const historyRecord = {
      borrowerName: borrowerName.trim(),
      borrowerEmail: borrowerEmail?.trim(),
      issuedAt: new Date(),
      dueDate: normalizedDueDate,
      notes: notes?.trim(),
    };

    book.issueHistory.unshift(historyRecord);
    const latestIssue = book.issueHistory[0];

    book.currentIssue = {
      borrowerName: latestIssue.borrowerName,
      borrowerEmail: latestIssue.borrowerEmail,
      issuedAt: latestIssue.issuedAt,
      dueDate: latestIssue.dueDate,
      notes: latestIssue.notes,
      issueRecordId: latestIssue._id,
    };
    book.availableCopies = Math.max(0, book.availableCopies - 1);

    await book.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Book issued successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to issue book",
    });
  }
};

module.exports = IssueBook;
