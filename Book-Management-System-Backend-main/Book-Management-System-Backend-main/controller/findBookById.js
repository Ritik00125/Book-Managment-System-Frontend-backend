const Books = require("../model/Book");


const findBookById = async(req , res) => {
  try {
    const {id} = req.params;
  const bookById = await Books.findById({_id : id});
  

   return res.status(200).json({
    data : bookById,
    message : "book detail fetched successfully",
    error : false,
    success : true,
   })
    
  } catch (error) {
    
      return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
 
}

module.exports = findBookById