const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
    unique: false,
  },
  bnumber: {
    type: String,
    required: true,
    unique: false,
  },
  joindate: {
    type: String,
    required: true,
    unique: false,
  },
  lastpromotion: {
    type: String,
    required: true,
    unique: false,
  },
  pfpicon: {
    type: String,
    required: true,
    unique: false,
  },
  playtime: {
    type: Number,
    required: true,
    unique: false,
  },
  hours: {
    type: Number,
    required: true,
    unique: false,
  },
});

const Data = mongoose.model("Data", dataSchema, "data");

module.exports = Data;
