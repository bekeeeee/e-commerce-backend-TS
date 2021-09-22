import { Router } from "express";
import { body } from "express-validator";
// import { validateRequet } from "../middlewares/validate-request";
import {
  createProduct,
    deleteProduct,
  //   updatePost,
  getProducts,
  getProduct,
} from "../controller/productController";
import { validateRequet } from "../middlewares/validate-request";
const router = Router();
router.get("/", getProducts);
router.get("/:id", getProduct);

router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 4, max: 100 })
      .withMessage("Name must be between 4 an 100 characters"),

    body("image").trim(),

    body("brand")
      .trim()
      .isLength({ min: 4, max: 100 })
      .withMessage("Brand must be between 4 an 100 characters"),

    body("category")
      .trim()
      .isLength({ min: 4, max: 100 })
      .withMessage("Category must be between 4 an 100 characters"),

    body("description")
      .trim()
      .isLength({ min: 4, max: 100 })
      .withMessage("Description must be between 4 an 100 characters"),

    body("price").isNumeric(),

    body("countInStock").isNumeric(),

    body("rating").isNumeric(),

    body("numReviews").isNumeric(),
  ],
    validateRequet,
  createProduct
);

// router.patch(
//   "/:id",
//   [
//     body("text")
//       .trim()
//       .isLength({ min: 4, max: 100 })
//       .withMessage("Text must be between 4 an 100 characters"),
//   ],
//   validateRequet,
//   updatePost
// );

router.delete("/:id", deleteProduct);

export { router as productRouter };
