function logger(req, res, next) {
    console.log(`Received a ${req.method} request to ${req.path}.`);
    return next();
}

function checkForPassword(req, res, next){
    console.log("Checking for password!");
    next();
}

module.exports = { logger, checkForPassword }