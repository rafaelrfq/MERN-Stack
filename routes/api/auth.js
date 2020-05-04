const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();


// User Model
const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!password || !email) {
        return res.status(400).json({msg: "Missing fields for user registration"});
    }
    User.findOne({ email }).then((user) => {
        if(!user) {
            return res.status(400).json({msg: "User does not exist"});
        }

        // Validate passwords
        bcrypt.compare(password, user.password).then(matches => {
            if(!matches) return res.status(400).json({ msg: 'Invalid credentials'});

            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => { 
                    if(err) throw err;
                    res.json({token, user: {id: user.id, name: user.name, email: user.email}});
                }
            )
        })
    })
});

// @route GET api/auth/user
// @desc Get user's data
// @access Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user));
});

module.exports = router;