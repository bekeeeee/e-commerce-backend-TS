import { Router } from "express";
import { body } from "express-validator";
import { validateRequet } from "../middlewares/validate-request";
import { currentUserMiddleware } from "../middlewares/current-user";

const router = Router();

// router.post("/saveShippingAddress", currentUserMiddleware, saveShippingAddress);

export { router as shippingAddressRouter };
