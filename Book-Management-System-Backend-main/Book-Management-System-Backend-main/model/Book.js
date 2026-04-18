const mongoose = require("mongoose");

const issueHistorySchema = new mongoose.Schema(
  {
    borrowerName: {
      type: String,
      required: true,
      trim: true,
    },
    borrowerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    _id: true,
  }
);

const currentIssueSchema = new mongoose.Schema(
  {
    borrowerName: {
      type: String,
      required: true,
      trim: true,
    },
    borrowerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    issueRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    edition: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pages: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1200,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    currentIssue: {
      type: currentIssueSchema,
      default: null,
    },
    issueHistory: {
      type: [issueHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BookSchema.pre("validate", function syncAvailableCopies(next) {
  if (this.availableCopies > this.totalCopies) {
    this.availableCopies = this.totalCopies;
  }

  if (this.currentIssue && this.availableCopies > 0) {
    this.availableCopies = 0;
  }

  next();
});

BookSchema.virtual("status").get(function getStatus() {
  return this.currentIssue ? "issued" : "available";
});

BookSchema.set("toJSON", { virtuals: true });
BookSchema.set("toObject", { virtuals: true });

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
