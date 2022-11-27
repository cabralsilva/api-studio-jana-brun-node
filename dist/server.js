"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const swagger = require("swagger-ui-express");
const Database_1 = require("./config/Database");
const i18n_1 = require("./config/i18n");
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
        this.app.use('/api/v1/docs', swagger.serve, swagger.setup(this.swaggerDocument));
        this.app.use(i18n_1.default.middleware);
    }
    routes() {
        this.app.route('/').get((_req, res) => {
            res.send({ application: "api-studio-jana-brun", version: '0.0.1' });
        });
        this.app.route('/api/v1/test').get((req, res) => {
            // const response = req["polyglot"].t('emailRequiredField');
            const helloWorld = `${res.i18n.t('message.test', 'pt-br')} ${res.i18n.t('message.test', 'en')}`;
            res.status(200);
            res.send(helloWorld);
        });
        //ROUTES UNAUTHENTICATED ABOVE
        // this.app.use(AuthServiceHttp.validate)
        //ROUTES AUTHENTICATED BELOW
    }
}
exports.default = new StartUp();
