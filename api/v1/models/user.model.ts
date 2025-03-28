import mongoose from "mongoose";

const userchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: String,
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userchema, "users");
export default User;