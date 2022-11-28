"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const swagger = require("swagger-ui-express");
const Database_1 = require("./config/Database");
const i18n_1 = require("./config/i18n");
const CityController_1 = require("./controller/CityController");
const CountryController_1 = require("./controller/CountryController");
const EmployeeController_1 = require("./controller/EmployeeController");
const StateController_1 = require("./controller/StateController");
class StartUp {
    constructor() {
        this.swaggerFile = (process.cwd() + "/postman/schemas/schema.json");
        this.swaggerData = fs.readFileSync(this.swaggerFile, 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
        this.app = express();
        this._db = new Database_1.default();
        this._db.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,PATCH,DELETE",
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json({ limit: '200mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        this.app.use(bodyParser.text({ limit: '200mb' }));
        this.app.use('/api/v2/docs', swagger.serve, swagger.setup(this.swaggerDocument));
        this.app.use(i18n_1.default.middleware);
    }
    routes() {
        this.app.route('/').get((_req, res) => {
            res.send({ application: "api-studio-jana-brun", version: '0.0.1' });
        });
        this.app.route('/api/v2/test').get((req, res) => {
            // const response = req["polyglot"].t('emailRequiredField');
            const helloWorld = `${res.i18n.t('message.test', 'pt-br')} ${res.i18n.t('message.test', 'en')}`;
            res.status(200);
            res.send(helloWorld);
        });
        this.app.route('/api/v2/country').get(CountryController_1.default.get);
        this.app.route('/api/v2/country/:id').get(CountryController_1.default.getById);
        this.app.route('/api/v2/country').post(CountryController_1.default.create);
        this.app.route('/api/v2/country/:id').patch(CountryController_1.default.update);
        this.app.route('/api/v2/country/:id').delete(CountryController_1.default.delete);
        this.app.route('/api/v2/state').get(StateController_1.default.get);
        this.app.route('/api/v2/state/:id').get(StateController_1.default.getById);
        this.app.route('/api/v2/state').post(StateController_1.default.create);
        this.app.route('/api/v2/state/:id').patch(StateController_1.default.update);
        this.app.route('/api/v2/state/:id').delete(StateController_1.default.delete);
        this.app.route('/api/v2/city').get(CityController_1.default.get);
        this.app.route('/api/v2/city/:id').get(CityController_1.default.getById);
        this.app.route('/api/v2/city').post(CityController_1.default.create);
        this.app.route('/api/v2/city/:id').patch(CityController_1.default.update);
        this.app.route('/api/v2/city/:id').delete(CityController_1.default.delete);
        this.app.route('/api/v2/employee').get(EmployeeController_1.default.get);
        this.app.route('/api/v2/employee/:id').get(EmployeeController_1.default.getById);
        this.app.route('/api/v2/employee').post(EmployeeController_1.default.create);
        this.app.route('/api/v2/employee/:id').patch(EmployeeController_1.default.update);
        this.app.route('/api/v2/employee/:id').delete(EmployeeController_1.default.delete);
        //ROUTES UNAUTHENTICATED ABOVE
        // this.app.use(AuthServiceHttp.validate)
        //ROUTES AUTHENTICATED BELOW
    }
}
exports.default = new StartUp();
