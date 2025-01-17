import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

// Use `models` to avoid redefining the model if it already exists.
export const User = models.User || model("User", UserSchema);
