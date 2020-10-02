require('dotenv').config()
const mongoose = require('mongoose');
const connection = `mongodb+srv://autoban:${process.env.MONGODB}@autoban.ulrka.mongodb.net/autoban?retryWrites=true&w=majority`;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));