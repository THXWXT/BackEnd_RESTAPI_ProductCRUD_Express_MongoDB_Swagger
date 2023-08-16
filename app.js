var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const products = require("./routes/product");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.uf2wqrn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connection successfully"))
  .catch((err) => console.log(err));

var indexRouter = require("./routes/index");
const { log } = require("debug/src/browser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", products);

//Swagger defination
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "This is a simple API application made with Express MongoDB and documented with Swagger",
      contact:{
        name:"Thanawat Phumphothong",
        email:"tanawatflook@hotmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
