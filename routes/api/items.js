const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create a new item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route PUT api/items
// @desc Edit an existent item
// @access Public
router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false})
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false}));
});

// @route DELETE api/items
// @desc Deletes a specific item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

module.exports = router;