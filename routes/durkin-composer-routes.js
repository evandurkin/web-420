/*
=========================
 Title: Assignment 4.2
 Author: Evan Durkin
 Date: November 14, 2021
 ========================
 */

// require and router statements
 const express = require("express");
const router = express.Router();
const Composer = require("../models/durkin-composer.js");

/**
 * @openapi
 * /api/composers:
 *   get:
 *     description: Find all composers.
 *     responses:
 *       200:
 *         description: Array of composer documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
*/

router.get("/composers", async(req, res) => {
    try {
        Composer.find({}, function(error, composers) {
            if (error) {
                console.log(error);
                res.status(501).send({
                    "message": `MongoDB Exception: ${error}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});

/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     summary: returns a composer document
 *     description: API for returning a single composer object from MongoDB.
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *           the composer id requested by the user
 *         required: true
 *         schema:
 *           type: string
 *           description: the composer id requested by the user
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.get("/composer/:id", async(req, res) => {
    try {
        Composer.findOne({"_id": req.params.id}, function(error, composer) {
            if (error) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                })
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});

/**
 * @openapi
 * /api/composers:
 *   post:
 *     summary: Creates a new composer object
 *     description: Creates a new composer object,
 *     requestBody:
 *       description:
 *         Composer's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/composers", (req, res) => {
    try {
      Composer.create(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
        (error, composer) => {
          if (error) res.status(501).send({
              "message": `MongoDB exception`
          })
        }
      )
    } catch (error) {
      res.status(500).send("server exception");
    }
  });

