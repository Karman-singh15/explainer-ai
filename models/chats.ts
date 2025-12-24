import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat ||
  mongoose.model("Chat", ChatSchema);
