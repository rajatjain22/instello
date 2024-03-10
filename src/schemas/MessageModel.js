import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversations",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Messages =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Messages;
