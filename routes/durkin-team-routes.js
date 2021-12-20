/*
==========================
Title: Capstone
Author: Evan Durkin
Date: December 18, 2021
==========================
*/

// require and router statements
const express = require("express");
const Team = require("../models/durkin-team");
const bcrypt = require("bcryptjs");
const router = express.Router();
const http = require("http");

/**
 * findAllTeams
 * @openapi
 * /api/teams
 *  get:
 *      tags:
 *      - teams
 *      name: findAllTeams
 *      description: lists all teams
 *      summary: Finds all teams and displays list.
 *      responses:
 *          200:
 *              description: Array of team documents
 *          500:
 *              description: Server Exception
 *          501: 
 *              description: MongoDB Exception
 */

router.get("/teams", async(req, res) => {
    try {
        Team.find({}, function(error, teams) {
            if (error) {
                res.status(501).send({
                    "message": `MongoDB Exception ${error}`
                })
            } else {
                res.json(teams);
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception ${e.message}`
        })
    }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/:id/players
 *  post:
 *      tags:
 *      - teams
 *      name: assignPlayerToTeam
 *      description: adds individual player to a team
 *      summary: assigns player to team document
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: finds player by id
 *            schema:
 *              type: string
 *          requestBody:
 *              description: player
 *              content:
 *                  application/json:
 *                      schema:
 *                          required:
 *                              - id
 *                              - name
 *                              - mascot
 *                          properties:
 *                              id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              mascot:
 *                                  type: string
 *           responses:
 *              200:
 *                  description: Player document
 *              401:
 *                  description: Invalid teamID
 *              500:
 *                  description: Server Exception
 *              501: 
 *                  description: MongoDB Exception
 *                  
 */

router.post("/teams", async(req, res) => {
    try {
        const newTeam = {
            id: req.body.id,
            name: req.body.name,
            mascot: req.body.name
        }
        await Team.create(newTeam, function(error, team) {
            if(error) {
                res.status(500).send({
                    "message": `MongoDB Exception: ${error}`
                })
            } else {
                res.json(team);
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        })
    }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players
 *  post:
 *      tags:
 *          - Teams
 *      name: findAllPlayersByTeamId
 *      description: Displays team by ID number
 *      summary: Finds team ID and displays document
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: find team by ID
 *            schema:
 *              type: string
 *          responses:
 *              200:
 *                  description: Array of player documents
 *              401:
 *                  description: Invalid teamID
 *              500:
 *                  description: Server Exception
 *              501:
 *                  description: MongoDB Exception
 */

router.get("/teams/:id/players", async(req, res) => {
    try {
        Team.findOne({"id": req.params.id}, function(error, teams) {
            if(error) {
                res.status(501).send({
                    "message": `MongoDB Exception ${error}`
                })
            }
            if (!teams) {
                res.status(401).send({
                    "message": "Invalid teamID"
                })
            } else {
                res.json(teams)
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception ${e.message}`
        })
    }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}
 *  delete:
 *      tags:
 *          - Teams
 *      name: deleteTeam
 *      description: Deletes a team document by ID
 *      summary: Deletes a team document by ID in db
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: team id
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Team document
 *          401:
 *              description: Invalid teamID
 *          500:
 *              description: Server Exception
 *          501:
 *              description: MongoDB Exception
 */

router.delete("/teams/:id", async(req, res) => {
    try {
        Team.findOneAndDelete({"id": req.params.id}, function(error, teams) {
            if(error) {
                res.status(501).send({
                    "message": `MongoDB Exception ${error}`
                })
            }
            if (!teams) {
                res.status(401).send({
                    "message": "Invalid teamID"
                })
            } else {
                res.status(200).send({
                    "message": "Success. Team Document Deleted"
                })
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception ${e.message}`
        })
    }
});

// export statement
module.exports = router;