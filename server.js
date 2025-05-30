'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const database = require('./dbconnect.js')

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only
app.use(helmet({
    frameguard: { actions: 'deny' },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", 'https://cdn.freecodecamp.org'],
            scriptSrc: ["'self'", 'https://code.jquery.com/jquery-2.2.1.min.js', "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    },
    referrerPolicy: {
        policy: 'same-origin'
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/b/:board/')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/board.html');
    });
app.route('/b/:board/:threadid')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/thread.html');
    });

//Index page (static HTML)
app.route('/')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
    });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, async function() {
    console.log('Your app is listening on port ' + listener.address().port);
    try {
        await database();
    } catch (error) {
        console.error(error);
    }
    if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...');
        setTimeout(function() {
            try {
                runner.run();
            } catch (e) {
                console.log('Tests are not valid:');
                console.error(e);
            }
        }, 1500);
    }
});

module.exports = app; //for testing
