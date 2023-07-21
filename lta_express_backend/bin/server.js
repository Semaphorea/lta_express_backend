"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
var routes = require('../routes/index.ts');
// Mount the routes middleware
app.use('/', routes);
app.set('view engine', 'pug');
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});
// Start the server
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
