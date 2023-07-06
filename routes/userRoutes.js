import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

//ROutes
//GET USER || GET


// UPDATE USER || PUT
router.put('/update-user', userAuth, userController)
export default router;