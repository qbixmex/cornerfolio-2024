import express from "express";
import { LicenseController } from "../controllers";

const router = express.Router();

router.post("/", LicenseController.create);
router.patch("/:id", LicenseController.update);

export default router;
