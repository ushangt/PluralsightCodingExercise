var express = require('express');
var router = express.Router();
var Entries = require("./models/Entries");

// Get all entries
router.get("/question", (req, res) => {
    Entries.findAll().then(entries => res.json(entries));
});

router.get("/question/:id", (req, res) => {
    Entries.findOne({where: {id: req.params.id}}).then(entry => res.json(entry));
});

// Add a new entry
router.post("/question", (req, res) => {
    var insertBody = {
        question: req.body.question,
        answer: req.body.answer,
        distractors: req.body.distractors
    };
    Entries.create(insertBody).then(question => res.json(question)).catch(err => res.json(err));
});

//Update an existing entry
router.put("/question/:id", (req, res) => {

    var updateBody = {
        question: req.body.question,
        answer: req.body.answer,
        distractors: req.body.distractors
    };
    var selector = {
        where: {'id': req.params.id}
    };

    Entries.update(updateBody, selector).then(question => res.json(question)).catch(err => res.json(err));
});

module.exports = router;