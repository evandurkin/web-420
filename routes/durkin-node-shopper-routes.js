/**
==========================
Title: Assignment 7.2
Author: Evan Durkin
Date: December 4, 2021
========================== 
*/

const express = require("express");
const Customer = require("../models/durkin-customer");
const router = express.Router();


/**
 * @openapi
 * /api/customers:
 *  post:
 *      tags:
 *      - Customers
 *      name: createCustomer
 *      summary: creates a new Customer
 *      requestBody:
 *       description: customer name and username 
 *       content:
 *         application/json:
 *           schema:
 *            required:
 *            - firstName
 *            - lastName
 *            - userName
 *            - invoices
 *         properties:
 *          firstName:
 *              type: "string"
 *          lastName:
 *               type: "string"
 *          userName:
 *               type: "string"
 *          invoices:
 *               type: "array"
 *          items: invoiceSchema
 *         responses:
 *           200:
 *             description: Customer added to MongoDB
 *           500:
 *             description: Server Exception
 *           501:
 *             description: MongoDB Exception
 */
router.post("/customers", async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

        await Customer.create(newCustomer, function(error, customer) {
            if (error) {
                res.status(500).send({
                    "message": `Server Exception ${error}`
                })
            } else {
                res.status(200).send({
                    "message": `Customer added to MongoDB`
                })
            }
        })
    } catch (e) {
        res.status(501).send({
            "message": `MongoDB Exception: ${e.message}`
        })
    }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:userName/invoices:
 *  post:
 *   tags:
 *   - Customers
 *   name: createInvoiceByUserName
 *   summary: Invoice created from userName
 *   requestBody:
 *     description: userName and invoice information
 *     content:
 *       application/json:
 *         schema:
 *           required:
 *              - userName
 *              - subtotal
 *              - tax
 *              - dateCreated
 *              - dateShipped
 *              - lineItems
 *           properties:
 *             userName:
 *               type: string
 *             subtotal:
 *               type: string
 *             tax:
 *               type: string
 *             dateCreated:
 *               type: string
 *             dateShipped:
 *               type: string
 *             lineItems:
 *               type: array
 *             items: lineItem objects
 *           responses:
 *             200:
 *               description: Customer added to MongoDB
 *             500:
 *               description: Server Exception
 *             501:
 *               description: MongoDB Exception
 *                  
 */
router.post("/customers/:userName/invoices", async(req, res) => {
    try {
        Customer.findOne({"userName":req.params.userName}, function(error, customer) {
            if (error) {
                res.status(500).send({
                    "message": `Server Exception ${error}`
                })
            } else {
                res.status(200).send({
                    "message": `Customer added to MongoDB`
                })
                const newInvoice = {
                    userName: req.params.userName,
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped
                }
                Customer.invoices.push(newInvoice);
                Customer.save()
            }
        })
    } catch (e) {
        res.status(501).send({
            "message": `MongoDB Exception ${e.message}`
        })
    }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 *  /api/customers/:userName/Invoices:
 *      get:
 *          tags:
 *          - Customers
 *          name: findAllInvoicesByUserName
 *          summary: Invoices found by username
 *          requestBody:
 *              description: Lists all invoices by username
 *              content:
 *                  application/json:
 *                      params:
 *                          required:
 *                              - userName
 *                  responses:
 *                      200:
 *                          description: Customer added to MongoDB
 *                      500:
 *                          description: Server Exception
 *                      501:
 *                          description: MongoDB Exception
 */

router.get("/customers/:userName/Invoices", async(req, res) => {
    try {
        Customer.findOne({"userName":req.params.userName}, function(error, customer) {
            if(error) {
                res.status(500).send({
                    "message": `Server Exception ${error}`
                })
            } else {
                res.status(200).send (customer.invoices)
            }
        })
    } catch (e) {
        res.status(501).send({
            "message": `MongoDB Exception ${e.message}`
        })
    }
});

module.exports = router;