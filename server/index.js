import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import dbConn from "./database/db.js";
import userRoute from "./Router/usersRouter.js";
import productRoute from "./Router/productRouter.js";
import cartRoute from "./Router/cartRouter.js";
import orderRoute from "./Router/orderRouter.js";
import categoryRoute from "./Router/categoryRouter.js";
import subCategoryRoute from "./Router/subCategoryRouter.js";

const app = express();
dotenv.config();
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
  })
);

app.use("/public", express.static("./public"));

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));

// invoking the database
dbConn();

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subCategory", subCategoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
