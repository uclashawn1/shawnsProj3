const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  expires: {
    type: Date
  },
  image_url: {
    type: String
  },
  shop: {
    type: String
  },
  wish: {
    type: String
  }
});

module.exports = Coupon = mongoose.model("coupon", CouponSchema);
