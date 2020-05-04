const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();


// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get All Users
// @access Public
router.get('/', (req, res) => {
    User.find()
    .sort({register_date: -1})
    .then(users => res.json(users));
});

// @route POST api/users
// @desc Create a new user
// @access Public
router.post('/', (req, res) => {
    const { name, password, email } = req.body;

    if(!name || !password || !email) {
        return res.status(400).json({msg: "Missing fields for user registration"});
    }
    User.findOne({ email }).then((user) => {
        if(user) {
            return res.status(400).json({msg: "A user with that email already exists"});
        }

        const newUser = new User({
            name, password, email
        });

        // Create salt & hash for encrypted password
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => { 
                            if(err) throw err;
                            res.json({token, user: {id: user.id, name: user.name, email: user.email}});
                        }
                    )

                    
                });
            });
        });
    })
});

// @route PUT api/users
// @desc Edit an existent user
// @access Public
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ success: false, err}));
});

// @route DELETE api/users
// @desc Deletes a specific user
// @access Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({ success: false, err}));
});

module.exports = router;