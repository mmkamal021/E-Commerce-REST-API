const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

// Create a Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a single Product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const findProduct = await Product.findById(id)
    res.json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a all Product
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getallProducts = await Product.find()
    res.json(getallProducts)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
}
