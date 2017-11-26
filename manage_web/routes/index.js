// session
var session = require('express-session');
var express = require('express');
var app = express();
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));
var url = require('url');


exports.index = function(req, res) {
    res.render('index');
};

exports.login = function(req, res) {
    var acc = req.body.acc; // get aaa
    var pass = req.body.pass; // get 0926xxx572
    // check 
    // connect db
    if (acc.match("aaa") && pass.match("bbb")) {
        // set session
        var user = {
            name: "Jack",
            isManager: true
        }
        req.session.user = user;
        console.log(req.session.user.name + " isManager?" + req.session.user.isManager);
        res.render('index');
    } else {
        res.send('error user . <br><a href="http://localhost:3000/">login</a>');
    }
};

exports.setNetwork = function(req, res) {
    // is manager
    if (req.session.user) {
        action = url.parse(req.url).pathname;
        if (action === "/api/addVm") {
            // call REST API
        } else if (action === "/api/rmVm") {
            // call REST API
        } else if (action === "/api/addService") {
            // call REST API
        } else if (action === "/api/rmService") {
            // call REST API
        } else if (action === "/api/cgMethod") {
            // call REST API
        }
	    res.render('index', { // go to choose page and send username variable
	        previous: action
	    });
    } else {
        res.render('login');
    }
};

exports.setVm = function(req, res) {
    // is manager
    if (req.session.user) {
        action = url.parse(req.url).pathname;
        if (action === "/api/addFlow") {
            // call REST API
        } else if (action === "/api/rmFlow") {
            // call REST API
        } else if (action === "/api/cgService") {
            // call REST API
        }
	    res.render('index');
    } else {
        res.render('login');
    }
};

exports.getStatistics = function(req, res) {
    // call REST API
    res.render('statistics');
};