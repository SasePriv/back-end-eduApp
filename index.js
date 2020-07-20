const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const http = require('http');
const cors = require('cors')
require('dotenv').config()
const fileUpload = require('express-fileupload')


//Initiliazations
const app = express();
const server = http.createServer(app)
const upload = multer()
require('./database');


//Settings
app.set('port', process.env.PORT || 4000);
app.all('/*', function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");
    next()
}); 

app.use(fileUpload());

//Static Files

//Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
// app.use(upload.array()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json())

//Routes
app.use(require('./routes/index.routes'));

//Server is listenning
server.listen(app.get('port'), () => {
    console.log('Server in port: ', app.get('port'));
});


