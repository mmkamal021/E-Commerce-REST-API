const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

// Create a Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    throw new Error(error)
  }
})
// Update a Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: taskID },
      req.body,
      {
        new: true,
      }
    )
    res.json(updateProduct)
    // console.log(updateProduct)
  } catch (error) {
    throw new Error(error)
  }
})
// Delete Product

const deleteProduct = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: taskID })
    res.json(deleteProduct)
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
  updateProduct,
  deleteProduct,
}
