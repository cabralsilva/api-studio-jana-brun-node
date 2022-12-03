"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const swagger = require("swagger-ui-express");
const Database_1 = require("./config/Database");
const i18n_1 = require("./config/i18n");
const AuthenticationController_1 = require("./controller/AuthenticationController");
const CityController_1 = require("./controller/CityController");
const CountryController_1 = require("./controller/CountryController");
const EmployeeController_1 = require("./controller/EmployeeController");
const GrateController_1 = require("./controller/GrateController");
const NoticeController_1 = require("./controller/NoticeController");
const PaymentConditionController_1 = require("./controller/PaymentConditionController");
const ProductController_1 = require("./controller/ProductController");
const RolePaymentController_1 = require("./controller/RolePaymentController");
const StateController_1 = require("./controller/StateController");
const SupplierController_1 = require("./controller/SupplierController");
const AuthorizationFlow_1 = require("./flow/authorization/AuthorizationFlow");
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
            const helloWorld = `${res.i18n.t('message.test', 'pt-br')} ${res.i18n.t('message.test', 'en')}`;
            res.status(200);
            res.send(helloWorld);
        });
        this.app.route('/api/v2/authenticator').post(AuthenticationController_1.default.authenticate);
        //ROUTES UNAUTHENTICATED ABOVE
        this.app.use(AuthorizationFlow_1.default.authorization);
        //ROUTES AUTHENTICATED BELOW
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
        this.app.route('/api/v2/employee/update/password').patch(EmployeeController_1.default.updatePassword);
        this.app.route('/api/v2/employee/:id').delete(EmployeeController_1.default.delete);
        this.app.route('/api/v2/notice').get(NoticeController_1.default.get);
        this.app.route('/api/v2/notice/:id').get(NoticeController_1.default.getById);
        this.app.route('/api/v2/notice').post(NoticeController_1.default.create);
        this.app.route('/api/v2/notice/:id').patch(NoticeController_1.default.update);
        this.app.route('/api/v2/notice/:id').delete(NoticeController_1.default.delete);
        this.app.route('/api/v2/payment-condition').get(PaymentConditionController_1.default.get);
        this.app.route('/api/v2/payment-condition/:id').get(PaymentConditionController_1.default.getById);
        this.app.route('/api/v2/payment-condition').post(PaymentConditionController_1.default.create);
        this.app.route('/api/v2/payment-condition/:id').patch(PaymentConditionController_1.default.update);
        this.app.route('/api/v2/payment-condition/:id').delete(PaymentConditionController_1.default.delete);
        this.app.route('/api/v2/supplier').get(SupplierController_1.default.get);
        this.app.route('/api/v2/supplier/:id').get(SupplierController_1.default.getById);
        this.app.route('/api/v2/supplier').post(SupplierController_1.default.create);
        this.app.route('/api/v2/supplier/:id').patch(SupplierController_1.default.update);
        this.app.route('/api/v2/supplier/:id').delete(SupplierController_1.default.delete);
        this.app.route('/api/v2/grate').get(GrateController_1.default.get);
        this.app.route('/api/v2/grate/:id').get(GrateController_1.default.getById);
        this.app.route('/api/v2/grate').post(GrateController_1.default.create);
        this.app.route('/api/v2/grate/:id').patch(GrateController_1.default.update);
        this.app.route('/api/v2/grate/:id').delete(GrateController_1.default.delete);
        this.app.route('/api/v2/product').get(ProductController_1.default.get);
        this.app.route('/api/v2/product/:id').get(ProductController_1.default.getById);
        this.app.route('/api/v2/product').post(ProductController_1.default.create);
        this.app.route('/api/v2/product/:id').patch(ProductController_1.default.update);
        this.app.route('/api/v2/product/:id').delete(ProductController_1.default.delete);
        this.app.route('/api/v2/role-payment').get(RolePaymentController_1.default.get);
        this.app.route('/api/v2/role-payment/:id').get(RolePaymentController_1.default.getById);
        this.app.route('/api/v2/role-payment').post(RolePaymentController_1.default.create);
        this.app.route('/api/v2/role-payment/:id').patch(RolePaymentController_1.default.update);
        this.app.route('/api/v2/role-payment/:id').delete(RolePaymentController_1.default.delete);
    }
}
exports.default = new StartUp();
