const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    side: {
      type: String,
      enum: ["BRIDE", "GROOM"],
      required: true,
    },

    events: {
      type: [String],
      default: [],
      validate: {
        validator: function(v) {
          return Array.isArray(v);
        },
        message: 'Events must be an array'
      }
    },

    rsvp: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED"],
      default: "PENDING",
    },

    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
guestSchema.index({ weddingId: 1 });
guestSchema.index({ weddingId: 1, rsvp: 1 });
guestSchema.index({ weddingId: 1, side: 1 });

// Debug pre-save hook
guestSchema.pre('save', function(next) {
  console.log('Pre-save guest data:', this.toObject());
  console.log('Events field:', this.events);
  next();
});

module.exports = mongoose.model("Guest", guestSchema);
