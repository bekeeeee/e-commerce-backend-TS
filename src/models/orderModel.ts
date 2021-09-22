import mongoose, { ObjectId, Schema } from "mongoose";
import { CartDoc } from "./cartModel";
import { ProductDoc } from "./productModel";
import { UserDoc } from "./userModel";

// An interface that describes the properties
// that are required to create a new User

interface OrderAttrs {
  cartId: ObjectId;
  userId: ObjectId;

  seller?: ObjectId;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;

  status?: string;
  update_time?: string;
  email_address?: string;
}

// An interface that describes the properties
// that a User Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(any: OrderAttrs): OrderDoc;
}
// An interface that describes the properties
// that a User Document has
export interface OrderDoc extends mongoose.Document {
  cartId?: ObjectId; // cart items

  userId: ObjectId;
  seller?: ObjectId;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;

  status?: string;
  update_time?: string;
  email_address?: string;
}

const OrderSchema: Schema<OrderDoc> = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: false,
    },
    paidAt: { type: Date },
    isDelivered: {
      type: Boolean,
      default: false,
      required: false,
    },
    deliveredAt: {
      type: Date,
      default: Date.now(),
      required: false,
    },

    status: {
      type: String,
      required: false,
    },
    update_time: {
      type: String,
      required: false,
    },
    email_address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (next) {
  await this.populate({ path: "cartId" }).execPopulate();
  next();
});

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);
export { Order };
