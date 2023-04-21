const express = require('express');
// const ExpressError = require("./expressError");
const middleware = require("./middleware")
const morgan = require('morgan')

const userRoutes = require("./userRoutes")

const app = express();

app.use(express.json());

// app.use(middleware.logger);

app.use(morgan('dev'))

app.use('/users', userRoutes);

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
    return res.send("I <3 You")
});
// To see it in browser:
// http://localhost:3000/secret?password=monkeybreath

app.get('/private', middleware.checkForPassword, (req, res, next) => {
    return res.send("homie")
});
// To see it in browser:
// http://localhost:3000/secret?password=hodi

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
})