const mongoose = require('mongoose');

const {EDU_APP_MONGODB_HOST, EDU_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${EDU_APP_MONGODB_HOST}/${EDU_APP_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('Db is Connect'))
.catch(err => console.log(err));