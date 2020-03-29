var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var BodyParser = require('body-parser');

mongoose.connect('mongodb+srv://bmulhern2:Bmole22%21%21@cluster0-eopst.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const Review = new Schema({
    company: String,
    review: String
});

const RR = mongoose.model('RR', Review);
var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set(path.resolve(__dirname + 'views'));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/Post', (req, res) => {
    var newRR = [
        {
            "company": req.body.company,
            "review": req.body.review
        }
    ];
    RR.create(newRR);
    res.redirect('/');
});
app.get('/api', (req, res) => {
    RR.find({}, function(err, data) {
        if(!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});
http.createServer(app).listen(8080, function(){
    console.log("Application has started on Port 8080");
});
