const { default: mongoose } = require('mongoose')

mongoose.set('strictQuery', false)
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL)
    console.log('Database Connected Successfully!')
  } catch (error) {
    console.log('Database error')
    // throw new Error(error)
  }
}

module.exports = dbConnect
