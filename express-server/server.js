'use strict';

let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('./UserRepository');
const validation = require('./ValidationService');


const port = process.env.PORT || 3111;
const server = app.listen(port, () => {
    console.log(`Running at Port ${port}`);
});
server.timeout = 1000 * 60 * 2;


const staticPath = './data/';
const registrationFile = staticPath+'registration.json';


// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Content-Type', 'application/json');
    next();
});


//Testausgabe uuid
app.get('/test', (req, res) => {
    const id = uuidv4();
    res.send(id);
});

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Post Request
let post = app.post('/register', (req, res) => {
    const HTTP_STATUS_NO_ACCEPTABLE = 406;
    let userObj = {
        "id": uuidv4(),
        "firstname": req.body.user.firstname,
        "lastname": req.body.user.lastname,
        "date": req.body.user.date,
        "option1": req.body.user.option1,
        "option2": req.body.user.option2,
        "option3": req.body.user.option3,
        "email": req.body.user.email,
        "number": req.body.user.number,
        "password": req.body.user.password,
        "passwordcheck": req.body.user.passwordcheck
    }

    let result = validation.validateUser(userObj);
    if (result.isNotValid){
        res.status(HTTP_STATUS_NO_ACCEPTABLE).send(result.msg);
    } else {
        //Nutzer speichern
        let userRepo = new UserRepository(registrationFile);
        userRepo.read()
            .then((data) => {
                console.log(userObj);
                data.push(userObj);
                return data;
            })
            .then(data => userRepo.save(data))
            .catch(error => {
                console.error(error);
            });
        res.status(201).send(`User ${userObj.firstname} inserted!`);
    }
});


/*
{
    "user": {
    "firstname": "",
    "lastname": "",
    "date": "",
    "option1": "",
    "option2": "",
    "option3": "",
    "email": "",
    "number": "",
    "password": "",
    "passwordcheck": ""
    }
}
*/








