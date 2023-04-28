const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/';

const connectDB = async () => {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
module.exports = connectDB;
