import { Response, Request, NextFunction } from "express";
// import { NotAuthorizedError } from "../errors/not-authorized-error";
import { BadRequestError } from "../errors/bad-request-error";
import { catchAsync } from "../services/catchAsync";
import { Order } from "../models/orderModel";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  let order = await Order.findOne({ userId: req.currentUser._id });
  console.log("current order", order);
  if (order) {
    order = await Order.findOneAndUpdate(
      { userId: req.currentUser._id },
      { ...req.body }
    );
  } else {
    try {
      order = await Order.build({ userId: req.currentUser._id, ...req.body });
      await order.save();
    } catch (err) {
      console.log("err", err);
    }
  }
  res.status(201).json({ order });
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
  console.log("id", req.params.id);
  const order = await Order.findById(req.params.id);
  if (order) res.status(200).json({ order });
  else throw new BadRequestError("Order not found");
});

export const getOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await Order.find();
  if (orders) res.status(200).json({ orders });
  else throw new BadRequestError("Order not found");
});

export const payOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      new: true,
    }
  );
  if (!order) {
    throw new BadRequestError("Order not found");
  }
  res.status(200).json({ order });
});
