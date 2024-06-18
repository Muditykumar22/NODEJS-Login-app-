const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
