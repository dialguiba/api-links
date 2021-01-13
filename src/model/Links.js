const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    min: 6,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //autopopulate: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  modified_on: {
    type: Date,
  },
});

linkSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Link", linkSchema);
