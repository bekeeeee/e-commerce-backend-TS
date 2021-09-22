import mongoose, { ObjectId, Schema } from "mongoose";
import { Cart } from "./cartModel";

// // An interface that describes the properties
// // that are required to create a new User
interface ShippingAddressAttrs {
  fullname: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  userId?: ObjectId;
}

// // An interface that describes the properties
// // that a User Model has
interface ShippingAddressModel extends mongoose.Model<ShippingAddressDoc> {
  build(any: ShippingAddressAttrs): ShippingAddressDoc;
}
// // An interface that describes the properties
// // that a User Document has
export interface ShippingAddressDoc extends mongoose.Document {
  fullname: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  userId: ObjectId;
}

const ShippingAddressSchema: Schema<ShippingAddressDoc> = new mongoose.Schema({
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: Number, required: true },
  country: { type: String, required: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

ShippingAddressSchema.statics.build = (attrs: ShippingAddressAttrs) => {
  return new ShippingAddress(attrs);
};
ShippingAddressSchema.post(/save/, async function (doc, next) {
  // this.fullname = "fd";
  // await Cart.findOneAndUpdate(
  //   { userId: this.userId },
  //   { shippingAddress: this._id }
  // );
  let cart = await Cart.findOne({ userId: doc.userId });

  if (cart) {
    cart.shippingAddress = doc._id;
    await cart.save();
  }

  console.log("shippingAddress", cart);

  next();
});

const ShippingAddress = mongoose.model<
  ShippingAddressDoc,
  ShippingAddressModel
>("ShippingAddress", ShippingAddressSchema);

export { ShippingAddress };
