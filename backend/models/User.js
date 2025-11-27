const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    interest: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Optionally create index on user_id & email
// userSchema.index({ user_id: 1 }, { unique: true });
// userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
