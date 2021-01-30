const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('../utility/errorHandler');
const routes = require('../api/routers/validate');

module.exports = (app) => {
    app.use(
        cors({
            origin: (origin, cb) => cb(null, true),
            credentials: true,
            preflightContinue: true,
            exposedHeaders: [
              "Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
              "X-Password-Expired",
              "Access-Control-Allow-Methods", 'POST,GET,OPTIONS,PUT,DELETE'
            ],
            optionsSuccessStatus: 200
        })
    );


    app.use(bodyParser.json());

    app.use('/', routes)

    app.use(errorHandler);


}