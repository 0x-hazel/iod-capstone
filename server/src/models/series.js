import mongoose, { Schema } from "mongoose";

const seriesSchema = new Schema({
    slug: { type: String, unique: true, index: true },
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

const Series = mongoose.model("Series", seriesSchema);
export default Series;