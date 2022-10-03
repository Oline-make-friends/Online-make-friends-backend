const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        sent_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        content: {
            type: String,
            max: 500,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: false,
        }
    },  
    { timestamps: true}
);

let Report = mongoose.model("Report", reportSchema);

module.exports = { Report };