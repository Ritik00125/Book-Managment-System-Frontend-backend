const Books = require("../model/Book");

const GetallBooks = async (req, res) => {
  try {
    const query = {};

    if (req.query.status === "issued") {
      query.currentIssue = { $ne: null };
    }

    if (req.query.status === "available") {
      query.currentIssue = null;
    }

    const allBooks = await Books.find(query).sort({ updatedAt: -1 });
    const countBooks = await Books.countDocuments();

    return res.json({
      data: allBooks,
      totalDocument : countBooks,
      success: true,
      error: false,
      message: "Books fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = GetallBooks;
