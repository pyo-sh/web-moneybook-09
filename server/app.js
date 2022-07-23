const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("*", function (req, res, next) {
    const PAGES = ["", "calendar", "statistic"];
    const { baseUrl } = req;
    const page = baseUrl.split("/")[1] || "";
    if (PAGES.includes(page)) {
        const publicPath = path.resolve(__dirname, "public", "index.html");
        res.sendFile(publicPath);
    } else next(createError(404));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
