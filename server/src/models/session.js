import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    id: String,
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        required: true
    }
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;