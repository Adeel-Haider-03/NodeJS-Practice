const URI="mongodb+srv://adeelboss3360:cwzFv7O7VnWjYy4c@cluster0.biodaoa.mongodb.net/devTinder"
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(URI)
}

module.exports = connectDB;