import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    slug: { type: String, unique: true, index: true },
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    content: String,
    created: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);
export default Post;