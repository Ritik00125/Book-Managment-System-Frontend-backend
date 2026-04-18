const contactModel = require("../../model/contactModel");

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if this email already submitted a response
    const existingResponse = await contactModel.findOne({ email });
    if (existingResponse) {
      return res.status(409).json({
        message: "You have already responded",
        success: false,
        error: true,
      });
    }

    // Save the new contact data
    const contactData = new contactModel({ name, email, message });
    const savedContact = await contactData.save();

    return res.status(200).json({
      contact: savedContact,
      message: "Your data is recorded",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = contact;
