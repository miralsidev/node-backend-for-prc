const mongooes = require("mongoose");
const ProductInsertSchema = new mongooes.Schema({
  plate_number: {
    type: String,
    unique: true,
    required: true,
  },
  filename: {
    type: String,
    require: true
  },
  size: {
    type: String,
    require: true
  },
  conneteType: {
    type: String,
    require: true
  },
  path: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  Air_Conditioning_Availability: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  luggage: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  // isBooking:{
  //   type:Boolean,
  //   default:false
  // },
  deletedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });
const Cars = mongooes.model("cars", ProductInsertSchema);
module.exports = Cars;
