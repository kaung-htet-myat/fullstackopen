require('dotenv').config()

const MONGO_URL = process.env.NODE_ENv !== "test" ? process.env.MONGO_URL : process.env.TEST_MONGO_URL
const PORT = process.env.PORT

module.exports = {
    MONGO_URL,
    PORT
}