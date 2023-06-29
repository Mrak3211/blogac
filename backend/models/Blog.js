const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blogs", NotesSchema);
