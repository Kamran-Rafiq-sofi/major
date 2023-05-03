const mongoose=require('mongoose');
const env=require('./environment')
// mongoose.connect('mongodb://127.0.0.1/Socialmedia_development');
console.log(env.db);
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
// mongoose.connect('mongodb://127.0.0.1:27017/Socialmedia_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error'));
db.once('open',function(){
    console.log('connected');
})

module.exports = db;