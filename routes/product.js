/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         prod_name:
 *           type: string
 *         prod_price:
 *           type: string
 *         prod_id:
 *           type: integer
 *         prod_desc:
 *           type: string
 *         updated_time:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *         examples:
 *           success:
 *             value:
 *               - prod_name: Product A
 *                 prod_price: 10000
 *                 prod_id: 1
 *                 prod_desc: Description A
 *                 updated_time: 2023-08-16T07:50:27.630Z
 *               - prod_name: Product B
 *                 prod_price: 55000
 *                 prod_id: 2
 *                 prod_desc: Description B
 *                 updated_time: 2023-08-16T07:50:27.630Z
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Product deleted
 *                 deleteProduct:
 *                   $ref: '#/components/schemas/Product'
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.js");

router.route("/").get(async (req, res, next) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.route("/:id").get(async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.route("/").post(async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.route("/:id").put(async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(updateProduct);
    console.log("Update Product Successfully");
  } catch (err) {
    next(err);
  }
});

router.route("/:id").delete(async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg: "Product delete",
      deleteProduct,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
