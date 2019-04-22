const mongoose = require('mongoose');

const dbUrl = `mongodb://127.0.0.1:27017/test`;
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('数据库打开了');
})

module.exports = mongoose;
