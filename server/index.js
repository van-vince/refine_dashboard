import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import warehouseRouter from "./routes/warehouseRoute.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/warehouses", warehouseRouter);


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();