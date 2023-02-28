const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwiToken')

// Create a Uaser
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const findUser = await User.findOne({ email })
  if (!findUser) {
    // Create a new User
    const newUser = await User.create(req.body)
    res.json(newUser)
  } else {
    throw new Error('User Already Exists')
  }
})

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // console.log(email, password)
  // check if user exists or not
  const findUser = await User.findOne({ email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    })
    // res.json(findUser)
  } else {
    throw new Error('Invalid Credentials')
  }
})

// Update a user

const updateaUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updateaUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    )
    res.json(updateaUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()
    res.json(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  // console.log(id)
  try {
    const getaUser = await User.findById(id)
    res.json({
      getaUser,
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a User

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  // console.log(id)
  try {
    const deleteaUser = await User.findByIdAndDelete(id)
    res.json({
      deleteaUser,
    })
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
}
