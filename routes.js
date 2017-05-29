'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var url = "https://iori.kr"


router.post('/game_rank',function(req,res){
    request.post(url + req.originalUrl).form(req.body).pipe(res);    
})


router.get('/game_getrank',function(req,res){
    request.get(url + req.originalUrl).form(req.body).pipe(res);
});

var serveStatic = require('serve-static')

router.use(serveStatic(__dirname))

module.exports = router;