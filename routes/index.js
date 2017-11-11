var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const BASE_URL = "http://localhost:3000/";

/* GET home page with al list of all questions. */
router.get('/', function (req, res) {
    fetch(BASE_URL+'api/question')
        .then(body => body.json())
        .then(json => res.render('pages/index', {questions: json}));
});

/* Submit the form to the REST API making a POST and redirect based on result */
router.post('/add/question', function (req, res) {
    //prepare the POST call
    var postOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(req.body)
    };
    fetch(BASE_URL+'api/question', postOptions)
        .then(body => body.json())
        .then(json => res.render('pages/add',
            {flash: {message: 'Question Added Successfully', role: 'success'}}))
        .catch(err => res.render('pages/add',
            {flash: {message: 'Something went wrong please try again', role: 'danger'}}));
});

/* GET add page where user can add a question. */
router.get('/add', function (req, res, next) {
    res.render('pages/add');
});

/* GET edit page where user can edit a question. Use the same form prefilled */
router.get('/edit/:id', function (req, res, next) {
    fetch(BASE_URL+'api/question/' + req.params.id)
        .then(body => body.json())
        .then(json => res.render('pages/edit', {title: "Edit Question", question: json}))
});

/* Submit the form to the REST API making a PUT call and redirect based on result */
router.post('/edit/question', function (req, res) {
    //prepare the PUT call
    var putOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(req.body)
    };
    fetch(BASE_URL+'api/question/' + req.body.id, putOptions)
        .then(body => body.json())
        .then(json => res.render('pages/edit',
            {flash: {message: 'Question Edited Successfully', role: 'success'}, question: req.body}))
        .catch(err => res.render('pages/edit',
            {flash: {message: 'Something went wrong please try again', role: 'danger'}, question: req.body}));
});

module.exports = router;
