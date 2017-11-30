// session
var express = require('express');
var app = express();
var url = require('url');
var request = require('request');


exports.index = function(req, res) {
    action = url.parse(req.url).pathname;
    if (action === "/logout") {
        console.log("log out");
        req.session.destroy();
        res.render('index', {
            isManager: false
        });
    } else {
        res.render('index', {
            isManager: false
        });
    }
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
        res.render('index', {
            isManager: true
        });
    } else {
        res.render('index', {
            isManager: false
        });
    }
};

exports.setNetwork = function(req, res) {
    // is manager  typeof myVar != 'undefined'
    if (req.session.user) {
        action = url.parse(req.url).pathname;
        if (action === "/api/addVm") {

            /* call REST API (GET)
            request({
                uri: "http://10.32.21.67:8080/quantum/v1.0/pools/",
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {
                console.log(body);
                console.log("add vm");
            });
            */
            /*
            curl -X POST -d '{"id":"1","name":"vip1","protocol":"icmp","address":"192.168.1.77","port":"8"}' http://10.32.21.67:8080/quantum/v1.0/vips/
            curl -X POST -d '{"id":"1","name":"pool1","protocol":"icmp","vip_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/pools/
            curl -X POST -d '{"id":"1","address":"192.168.1.11","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            curl -X POST -d '{"id":"2","address":"192.168.1.12","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            curl -X POST -d '{"id":"3","address":"192.168.1.13","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            curl -X POST -d '{"id":"4","address":"192.168.1.31","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            curl -X POST -d '{"id":"5","address":"192.168.1.32","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            curl -X POST -d '{"id":"6","address":"192.168.1.33","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            */
            /*   call REST API (POST) 
                curl -X POST -d '{"id":"1","address":"192.168.1.11","port":"8","pool_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/members/
            */
            var jsData = {
                id: req.body.mid,
                pool_id: req.body.sid,    
                address: req.body.address,
                port: req.body.port
            }
            var str = JSON.stringify(jsData);   
            request({
                uri: "http://10.32.21.67:8080/quantum/v1.0/vips/",
                method: "POST",
                form: str
            }, function(error, response, body) {
                console.log(body);
            });
        } else if (action === "/api/rmVm") {
            // call REST API

        } else if (action === "/api/addService") {
            // curl -X POST -d '{"id":"1","name":"vip1","protocol":"icmp","address":"192.168.1.77","port":"8"}' http://10.32.21.67:8080/quantum/v1.0/vips/
            var jsData = {
                id: req.body.sid,    // unique
                name:"vip"+req.body.sid,
                protocol: req.body.protocol,
                address: req.body.vip,
                port: req.body.port
            }
            var str = JSON.stringify(jsData);   
            request({
                uri: "http://10.32.21.67:8080/quantum/v1.0/vips/",
                method: "POST",
                form: str
            }, function(error, response, body) {
                console.log(body);
                console.log("add service");
            });
            // curl -X POST -d '{"id":"1","name":"pool1","protocol":"icmp","vip_id":"1"}' http://10.32.21.67:8080/quantum/v1.0/pools/
            jsData = {
                id: req.body.sid,    // unique
                name: "pool"+req.body.sid,
                protocol: req.body.protocol,
                vip_id: req.body.sid
            }
        } else if (action === "/api/rmService") {
            // call REST API
            console.log("rm service");
        } else if (action === "/api/cgMethod") {
            // call REST API
            console.log("change method");
        }
        res.render('index', {
            isManager: true
        });
    } else {
        res.render('index', {
            isManager: false
        });
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
        res.render('index', {
            isManager: true
        });
    } else {
        res.render('index', {
            isManager: false
        });
    }
};

exports.getStatistics = function(req, res) {
    // call REST API
};