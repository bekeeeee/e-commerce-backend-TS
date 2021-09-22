import { Response, Request, NextFunction } from "express";
import { Product } from "../models/productModel";
// import { NotAuthorizedError } from "../errors/not-authorized-error";
import { BadRequestError } from "../errors/bad-request-error";
import { catchAsync } from "../services/catchAsync";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    qty,
    rating,
    numReviews,
  } = req.body;
  // const userId = req.currentUser?._id;
  const post = Product.build({
    // name,
    // image,
    // brand,
    // category,
    // description,
    // price,
    // qty,
    // rating,
    // numReviews,
    ...req.body,
  });
  await post.save();

  res.status(201).json({ post });
});

// export const updatePost = catchAsync(async (req: Request, res: Response) => {
//   const { text } = req.body;
//   let post = await Product.findById(req.params.id);
//   if (!post) {
//     throw new BadRequestError("Post not found");
//   }
//   const userId = req.currentUser?._id;

//   if (userId != post?.user.id) {
//     throw new NotAuthorizedError();
//   }
//   // const existPost = await Post.findById(req.params.id);
//   post = await Post.findByIdAndUpdate(
//     req.params.id,
//     { text },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json({ post });
// });

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  // const userId = req.currentUser?._id;

  // if (userId == product?.user._id || req.currentUser?.role === "admin") {
  product = await Product.findByIdAndDelete(req.params.id);

  res.status(201).json({ status: "success", product });
  // } else {
  //   throw new NotAuthorizedError();
  // }
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await Product.find().sort({ _id: -1 }).exec();
  res.status(200).json({ products });
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) res.status(200).json(product);
  else throw new BadRequestError("Product not found");
});
