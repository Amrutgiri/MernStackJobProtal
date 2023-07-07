//Packges Importers

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import 'express-async-errors';

// files import
import connectDB from "./config/db.js";

//route imports
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoute from "./routes/jobsRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// rest Object
const app = express();

//dotenv config
dotenv.config();

//Mongodb
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Route
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoute);
// validation middleware
app.use(errorMiddleware);

// extract port
const PORT = process.env.PORT || 8090;

// Listen
app.listen(PORT, () => {
    console.log(`Node Server is Running on ${process.env.DEV_MODE} port ${PORT}`.rainbow);
});