import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    username: { type: String, unique: true },
    displayName: String,
    bio: { type: String, default: "" },
    avatar: String,
    passwordHash: String,
    created: { type: Date, default: Date.now }
});

const Account = mongoose.model('Account', accountSchema);
export default Account;