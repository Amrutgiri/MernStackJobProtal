import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserController, userController } from "../controllers/userController.js";

const router = express.Router();

//ROutes
//GET USER DATA || POST
router.post('/getUser', userAuth, getUserController)

// UPDATE USER || PUT
router.put('/update-user', userAuth, userController)
export default router;