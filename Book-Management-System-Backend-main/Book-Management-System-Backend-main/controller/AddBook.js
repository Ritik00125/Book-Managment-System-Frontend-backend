const Books = require("../model/Book");

const AddBook = async (req, res) => {
  try {
    const totalCopies = Number(req.body.totalCopies || 1);

    const bookDetail = new Books({
      ...req.body,
      totalCopies,
      availableCopies: totalCopies,
    });

    await bookDetail.save();

    return res.status(201).json({
      data: bookDetail,
      message: "Book added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to add book",
      success: false,
      error: true,
    });
  }
};

module.exports = AddBook;
