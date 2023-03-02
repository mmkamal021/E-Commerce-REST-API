const express = require('express')
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.post('/reset-password/:token', resetPassword)
router.put('/password', authMiddleware, updatePassword)
router.post('/login', loginUserCtrl)
router.get('/all-users', getallUser)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get('/:id', authMiddleware, isAdmin, getaUser)
router.delete('/:id', deleteaUser)
// router.put('/:id', updateaUser) // using to --> req.param
router.put('/edit-user', authMiddleware, updateaUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router
