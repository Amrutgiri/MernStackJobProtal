//Packges Importers

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import 'express-async-errors';
// securities packages
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from "express-mongo-sanitize";
// files import
import connectDB from "./config/db.js";

//route imports
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoute from "./routes/jobsRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//dotenv config
dotenv.config();
//Mongodb
connectDB();
//swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Protal Application",
            description: "Nodejs Express Job Portal Application"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ['./routes/*.js'],
};
const spec = swaggerDoc(options);


// rest Object
const app = express();



//middleware
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Route
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoute);

// homeroutes root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);

// extract port
const PORT = process.env.PORT || 8090;

// Listen
app.listen(PORT, () => {
    console.log(`Node Server is Running on ${process.env.DEV_MODE} port ${PORT}`.rainbow);
});