import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number:{type:Number,required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // ✅ all new users are normal by default
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("login details", userSchema);
