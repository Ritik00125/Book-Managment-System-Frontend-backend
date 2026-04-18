const Books = require("../model/Book");

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
  

    const deleteBooks = await Books.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      error: false,
      data: deleteBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = deleteBook;
