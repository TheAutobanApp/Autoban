const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  const connection = `mongodb+srv://autoban:${process.env.MONGODB}@autoban.ulrka.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
  mongoose
    .connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.log(err));
} else {
  var mongoDB = 'mongodb://localhost:27017/autoban_data';
  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Local Database Connected Successfully'))
    .catch((err) => console.log(err));
}
