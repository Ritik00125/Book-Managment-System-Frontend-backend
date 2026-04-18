const Books = require("../model/Book");

const updateBookDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBook = await Books.findById(id);

    if (!existingBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: true,
      });
    }

    const nextTotalCopies = Number(
      req.body.totalCopies ?? existingBook.totalCopies ?? 1
    );
    const issuedCopies = existingBook.currentIssue ? 1 : 0;

    if (nextTotalCopies < issuedCopies) {
      return res.status(400).json({
        message: "Total copies cannot be lower than currently issued copies",
        success: false,
        error: true,
      });
    }

    const updatedPayload = {
      ...req.body,
      totalCopies: nextTotalCopies,
      availableCopies: Math.max(0, nextTotalCopies - issuedCopies),
    };

    const updatedBook = await Books.findByIdAndUpdate(id, updatedPayload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Book detail updated successfully",
      success: true,
      error: false,
      data: updatedBook
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateBookDetail;
