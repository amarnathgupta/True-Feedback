import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    isVerified: boolean;
    messages: Message[];
}


const userSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required!"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "VerifyCodeExpiry is required!"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false,
    },
    messages: [MessageSchema]
}, {timestamps: true});

// const User = model("User", userSchema);

const UserModel = (
    mongoose.models.User as mongoose.Model<User>
) || (
    mongoose.model<User>("User", userSchema)
)

export default UserModel;