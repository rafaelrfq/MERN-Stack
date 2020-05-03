const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

// For local development
// const environment = process.env.NODE_ENV;

// For heroku
const environment = process.env.NODE_ENV || 'production';

// Middleware to serve json (bodyparser)
app.use(express.json());

// MongoDB URI
const db = require('./config/keys');

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if env is production
if (environment === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));