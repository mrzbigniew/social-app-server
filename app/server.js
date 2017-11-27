"use strict"

const express = require("express");
const bodyParser = require("body-parser");
const log = console.log;
const Post = require('./modules/post');

const app = express();
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/posts', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }        
        res.status(200).json(posts);
    });
});

app.post('/api/posts', function (req, res, next) {
    const post = new Post({
        username: req.body.username,
        body: req.body.body
    });

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }
        res.status(201).json(post);
    });
});

app.delete('/api/posts/:id', function (req, res, next) {
    Post.findByIdAndRemove(req.params.id,function(err){
        if(err){
            return next(err);
        }
        res.status(204).end();
    });
});

app.put('/api/posts/:id', function (req, res, next) {
    console.log(req.body);
    Post.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            body: req.body.body
        },
        function(err){
            if(err){
                return next(err);
            }
            res.status(204).end();
        }
    );
});

app.listen(3000, function () {
    log('Server is listening at port number', 3000);
});

module.exports = app;
