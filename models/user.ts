import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
