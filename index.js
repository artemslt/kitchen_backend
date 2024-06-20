require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { DB_HOST, PORT } = process.env;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const infoRouter = require("./routes/accountInfo");
const { NOT_FOUND } = require("./constants/statusCode");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/dashboard", userRouter);
app.use("/info", infoRouter);

app.use((req, res) => {
    res.status(NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    res.status(NOT_FOUND).json({ message: err.message });
});

mongoose
    .connect(DB_HOST, {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });

        console.log("Database connection successful");
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
