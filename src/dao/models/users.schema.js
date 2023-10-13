import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    githubProfile: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    role: {
        type: String,
        enum: ["Admin", "User", "Premium"],
        default: "Premium",
    }
});

const userModel = mongoose.model(collection, schema);

export default userModel;
