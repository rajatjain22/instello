import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: {
    type: String,
    enum: ["private", "group"],
    required: true,
    default: "private",
  },
});

const Conversations =
  mongoose.models.conversations ||
  mongoose.model("conversations", conversationSchema);

module.exports = Conversations;
