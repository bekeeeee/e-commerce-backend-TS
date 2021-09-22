import mongoose, { ObjectId, Schema } from "mongoose";
import { populateOptions } from "../services/utils";
import { ShippingAddress, ShippingAddressDoc } from "./shippingAddressModel";

// An interface that describes the properties
// that are required to create a new User
export interface OrderItems {
  item: ObjectId;
  qty: number;
}

interface CartAttrs {
  orderItems: OrderItems[];
  shippingAddress?: ObjectId;
  paymentMethod?: string;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;

  userId?: ObjectId;
}

// // An interface that describes the properties
// // that a User Model has
interface CartModel extends mongoose.Model<CartDoc> {
  build(any: CartAttrs): CartDoc;
}
// // An interface that describes the properties
// // that a User Document has
export interface CartDoc extends mongoose.Document {
  orderItems: OrderItems[];
  shippingAddress: ObjectId;
  paymentMethod?: string;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;

  userId: ObjectId;
}

const CartSchema: Schema<CartDoc> = new mongoose.Schema({
  orderItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: { type: Number },
    },
  ],
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress",
    required: false,
  },
  paymentMethod: { type: String, required: false },

  itemsPrice: { type: Number, required: false },
  shippingPrice: { type: Number, required: false },
  taxPrice: { type: Number, required: false },
  totalPrice: { type: Number, required: false },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

CartSchema.pre(/^find/, async function (next) {
  this.populate(populateOptions);

  next();
});

CartSchema.pre(/save/, async function (next) {
  const toPrice = (num: number) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  const shippingAddress = await ShippingAddress.findOne({
    userId: this.userId,
  });
  this.shippingAddress = shippingAddress?._id;

  await this.populate(populateOptions).execPopulate();
  this.itemsPrice = toPrice(
    this.orderItems.reduce((a: number, c: any) => a + c.qty * c.item.price, 0)
  );
  this.shippingPrice =
    this.itemsPrice > 100 || this.orderItems.length === 0
      ? toPrice(0)
      : toPrice(10);
  this.taxPrice = toPrice(0.15 * this.itemsPrice);
  this.totalPrice = this.itemsPrice + this.shippingPrice + this.taxPrice;
  next();
});

const Cart = mongoose.model<CartDoc, CartModel>("Cart", CartSchema);
export { Cart };
