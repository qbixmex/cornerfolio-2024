import express from "express";
import { LicenseController } from "../controllers";
import { validateToken } from "./validation";

const router = express.Router();

router.post("/", validateToken, LicenseController.create);
router.patch("/:id", validateToken, LicenseController.update);

export default router;
