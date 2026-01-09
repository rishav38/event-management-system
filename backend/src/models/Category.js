const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    order: {
      type: Number,
      default: 0
    },

    plannedBudget: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
