import { Router } from "express";
import { body } from "express-validator";
import { validateRequet } from "../middlewares/validate-request";
import {
  createOrder,
  getOrder,
  getOrders,
  payOrder
} from "../controller/orderController";
import { currentUserMiddleware } from "../middlewares/current-user";

const router = Router();
// router.get("/", getProducts);
// router.get("/:id", getProduct);

router.post(
  "/",
  currentUserMiddleware,
  // [
  //   body("cart.orderItems").isArray().withMessage("orderItems must be array"),
  //   body("orderItems.*.itemId")
  //     .trim()
  //     .isLength({ min: 2, max: 100 })
  //     .withMessage("itemId must be string"),

  //   body("cart.fullName")
  //     .trim()
  //     .isLength({ min: 2, max: 100 })
  //     .withMessage("Name must be between 4 an 100 characters"),

  //   body("cart.city")
  //     .trim()
  //     .isLength({ min: 2, max: 100 })
  //     .withMessage("city must be between 4 an 100 characters"),

  //   body("cart.country")
  //     .trim()
  //     .isLength({ min: 4, max: 100 })
  //     .withMessage("country must be between 4 an 100 characters"),

  //   body("address")
  //     .trim()
  //     .isLength({ min: 4, max: 100 })
  //     .withMessage("address must be between 4 an 100 characters"),
  //   body("postalCode").isNumeric().withMessage("postalCode must be a number"),

  //   body("paymentMethod")
  //     .trim()
  //     .isLength({ min: 4, max: 100 })
  //     .withMessage("paymentMethod must be between 4 an 100 characters"),

  //   // body("price").isNumeric(),

  //   // body("countInStock").isNumeric(),

  //   // body("numReviews").isNumeric(),
  // ],
  // validateRequet,
  createOrder
);

router.get("/", getOrders);

router.get("/:id",currentUserMiddleware, getOrder);
router.put("/:id/pay",currentUserMiddleware, payOrder);

export { router as orderRouter };
