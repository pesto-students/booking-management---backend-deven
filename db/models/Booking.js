const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCheckIn: {
    type: Date,
    required: true,
  },
  dateCheckOut: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  specialRequest: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  propertyId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Property",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});
// replace _id with id when return
bookingSchema.method("toJSON", function () {
  var obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

module.exports = mongoose.model("Booking", bookingSchema);
