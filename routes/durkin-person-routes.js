/*
==========================
Title: Assignment 5.2
Author: Evan Durkin
Date: November 21, 2021
==========================
*/

// require and router statements
const express = require("express");
const router = express.Router();
const Person = require("../models/durkin-person");


/**
 * @openapi
 * /api/persons:
 *   get:
 *     description: Find all persons.
 *     responses:
 *       200:
 *         description: Array of person documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
*/
router.get("/persons", async(req, res) => {
    try {
        Person.find({}, function(error, persons) {
            if (error) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${error}`
                })
            } else {
                res.json(persons);
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `MongoDB Exception: ${e.message}`
        })
    }
});

/**
 * @openapi
 * /api/persons:
 *   post:
 *     summary: creates a new person object
 *     description: creates a new person object,
 *     requestBody:
 *       description:
 *         Person's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *               roles:
 *                  type: "array"
 *               dependents:
 *                  type: "array"
 *               birthdate: 
 *                  type: "string"
 *     responses:
 *       200:
 *         description: Person document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/persons", async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        };
        await Person.create(newPerson, function(error, person) {
            if (error) {
                res.status(500).send({
                    "message": `MongoDB Exception: ${error}`
                })
            } else {
                res.json(person);
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});

module.exports = router;