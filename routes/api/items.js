const express = require('express');
const auth = require('../../middleware/auth');
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
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route PUT api/items
// @desc Edit an existent item
// @access Private
router.put('/:id', auth, (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false})
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false, err}));
});

// @route DELETE api/items
// @desc Deletes a specific item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({ success: false, err}));
});

module.exports = router;