const mongoose = require("mongoose");

const budgetSnapshotSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
      index: true
    },

    version: {
      type: Number,
      required: true
    },

    data: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BudgetSnapshot", budgetSnapshotSchema);
