const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                require: true,
            }
        ],
        name: {
            type: String,
        },
        content: {
            type: String,
            max: 500,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            }
        ],
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        groups_request: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

    },
    { timestamps: true }
);

let Group = mongoose.model("Group", groupSchema);

module.exports = { Group };