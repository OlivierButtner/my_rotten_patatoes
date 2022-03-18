// models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: String,
  password: {
    type: String,
    required: true,
  },
  favoris: [{ _id: false, title: String, id: String }],

  role: { type: String, default: "Basic" },
});

UserSchema.set("timestamps", true);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
