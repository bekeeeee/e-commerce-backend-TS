import { Response, Request } from "express";
import { Product } from "../models/productModel";
// import { NotAuthorizedError } from "../errors/not-authorized-error";
import { BadRequestError } from "../errors/bad-request-error";
import { catchAsync } from "../services/catchAsync";
import { Cart } from "../models/cartModel";
import { ShippingAddress } from "../models/shippingAddressModel";

export const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { itemId, qty } = req.body;

  console.log("addToCart");
  const product = await Product.findById(itemId);
  if (!product) {
    throw new BadRequestError("Product not found");
  }

  let cart = await Cart.findOne({ userId: req.currentUser?._id }).then(
    async (c) => {
      if (c) {
        const index = c
          ? c.orderItems?.findIndex((order: any) => {
              return order.item._id == itemId;
            })
          : -1;

        if (index > -1) {
          console.log("set");
          c.orderItems[index].qty = qty;
        } else {
          console.log("push");
          c.orderItems.push({ item: itemId, qty });
        }
        await c?.save();
      } else {
        console.log("create");

        c = await Cart.build({
          orderItems: [{ item: itemId, qty }],
          userId: req.currentUser?._id,
        });

        c = await c.save();
      }
      return c;
    }
  );
  // console.log("end");
  res.status(201).json({ cart });
});

export const deleteItemFromCart = catchAsync(
  async (req: Request, res: Response) => {
    console.log("deleteItemFromCart");
    const { itemId } = req.body;

    let cart = await Cart.findOne({ userId: req.currentUser?._id }).then(
      async (c) => {
        if (c) {
          const index = c
            ? c.orderItems?.findIndex((order: any) => {
                return order.item._id == itemId;
              })
            : -1;
          if (index > -1) {
            console.log("pull");
            c.orderItems.splice(index, 1);
          } else {
            throw new BadRequestError("item has been deleted");
          }
          await c.save();
        } else {
          throw new BadRequestError("Cart has been deleted");
        }

        return c;
      }
    );

    res.status(201).json({ cart });
  }
);

export const saveShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    let shippingAddress = await ShippingAddress.findOne({
      userId: req.currentUser?._id,
    });

    if (shippingAddress) {
      try {
        shippingAddress = await ShippingAddress.findOneAndUpdate(
          { userId: req.currentUser?._id },
          { ...req.body }
        );
        res.status(201).json({ shippingAddress });
      } catch (err) {
        console.log("err", err);
      }
    } else {
      try {
        shippingAddress = await ShippingAddress.build({
          ...req.body,
          userId: req.currentUser?._id,
        });
        await shippingAddress.save();
        res.status(201).json({ shippingAddress });
      } catch (err) {
        console.log("err", err);
      }
    }
  }
);

export const updatePaymentMethod = catchAsync(
  async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ userId: req.currentUser?._id });
    if (cart) {
      cart.paymentMethod = req.body.paymentMethod;
      await cart.save();
      res.status(200).json({ cart });
    } else throw new BadRequestError("Cart not found");
  }
);
