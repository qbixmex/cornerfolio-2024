import express from "express";
import { LicenseController } from "../controllers";
import { validateToken } from "./validation";

const router = express.Router();

router.post("/", validateToken, LicenseController.create);
router.get("/:id", validateToken, LicenseController.show);
router.patch("/:id", validateToken, LicenseController.update);
router.delete("/:id", validateToken, LicenseController.remove);

export default router;
