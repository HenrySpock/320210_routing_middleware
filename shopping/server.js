const express = require('express');
const app = express();
const listRouter = require('./list');

// Use middleware to parse JSON request bodies
app.use(express.json());

// Mount the shopping list router at /list
app.use('/list', listRouter);

// Start the server and export the server object
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
module.exports = server;