// "use strict";
const express = require('express');
const body_parser = require('body-parser');
// const route = require('./controllers');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const statusTwoHundred = 200;
const statusFiveHundred = 500;
const model = require('./models');


// data seerders


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.status(statusTwoHundred).send('ok');
});
app.get('/errorHandelerRoot', function (req, res, next) {
    next(new Error('whoops!'))
});

app.use(body_parser.urlencoded({
    limit: '50mb',
    extented: true
}));
app.use(body_parser.json({ limit: '50mb', extented: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());


app.use(function (err, req, res, next) {
    res.status(statusFiveHundred).send('Somthing broke !');
});

// route(app);

// Routes
app.use('/', routes);

process.on('uncaughtException', function (err) {
    console.log('Ucaught excepttion', err);
});

console.log("Syncing database...");

model.sequelize.sync({
    // logging: false,
    alter: true
}).then(function () {
    console.log("Starting up server....");
    app.listen(3000, function () {
        console.log('Lisenting at port 3000')
    });
});

module.exports = app;