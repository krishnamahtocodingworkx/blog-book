import mongoose from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}
const commentSchema = new mongoose.Schema<IComment>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
export default Comment;
