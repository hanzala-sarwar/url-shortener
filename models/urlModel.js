import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        shorturl: {
            type: String,
            required: true,
            unique: true,
        },

        // ✅ NEW FIELD
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Url || mongoose.model("Url", urlSchema);