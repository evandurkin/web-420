/*
==========================
Title: Assignment 6.2
Author: Evan Durkin
Date: November 27, 2021
==========================
*/

// require and router statements
const express = require("express");
const User = require("../models/durkin-user");
const bcrypt = require("bcryptjs");
const router = express.Router();

const saltRounds = 10;


/**
* @openapi
*  /api/signup:
*    post:
*      tags:
*        - Users
*      name: Sign up
*      summary: Creates a new registered user.
*      requestBody:
*      description:
*      content:
*        application/json:
*          schema:
*            required:
*              - userName
*              - password
*              - email address
*            properties:
*              userName:
*                type: string
*              Password:
*                type: string
*              emailAddress:
*                type: string
*      responses:
*        200:
*          description: Registered User
*        401:
*          description: Username is already in use
*        500:
*          description: Server Exception
*        501:
*          description: MongoDB Exception
*/
router.post("/signup", (req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        const newRegisteredUser = {
            userName: req.body.userName,
            Password: hashedPassword,
            emailAddress: req.body.emailAddress
        }

        User.findOne({"userName": req.body.userName}, function(error, user) {
            if(error) {
                res.status(501).send({
                    "message": `Mongo DB Exception: ${error}`
                })
            } else {
                if(!user){
                    User.create(newRegisteredUser, function(error, user) {
                        if(error) {
                            res.status(501).send({
                                "message": `MongoDB Exception: ${error}`
                            })
                        } else {
                            res.status(200).send({
                                "message": `Registered User`
                            })
                        }
                    })
                } else {
                    res.status(401).send({
                        "message": `Username is already in use`
                    })
                }
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});


/**
* @openapi
* /api/login:
*  post:
*    tags:
*      - Users
*    name: Login
*    summary: Checks and verifies username and password
*    requestBody:
*     description: 
*     content:
*       application/json:
*         schema:
*           required:
*             - userName
*             - password
*             - email address
*           properties:
*             userName:
*               type: string
*             Password:
*                type: string
*             emailAddress:
*                 type: string
*     responses:
*       200:
*         description: User logged in
*       401:
*         description: Invalid username and/or password
*       500:
*         description: Server Exception
*       501:
*          description: MongoDB Exception
*/

router.post("/login", async(req, res) => {
    try {
        User.findOne({"userName": req.body.userName}, function(error, user) {
            if(error) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${error}`
                })
            } else {
                if(user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
                    if(passwordIsValid) {
                        res.status(200).send({
                            "message": `User logged in`
                        })
                    } else {
                        res.status(401).send({
                            "message": `Invalid username and/or password`
                        })
                    }
                } else {
                    res.status(401).send({
                        "message": `Invalid username and/or password`
                    })
                }
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});

// export statement
module.exports = router;


