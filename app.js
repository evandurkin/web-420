// Title: Assignment 1.2
// Author: Evan Durkin
// Date: October 23, 2021


// require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");


// assigns express to a variable
const app = express();

// set statements
app.set("port", process.env.PORT || 3000);

// use statements
app.use(express.json());
app.use(express.urlencoded({"extended":true}));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"], // files containing annotations for the OpenAPI specification
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

http.createServer(app).listen(app.get("port"), function()
    { console.log("Application started and listening on port 3000")});
