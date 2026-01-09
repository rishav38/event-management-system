const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    totalBudget: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wedding", weddingSchema);
