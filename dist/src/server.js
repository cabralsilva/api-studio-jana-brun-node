"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const swagger = __importStar(require("swagger-ui-express"));
const Database_1 = __importDefault(require("./config/Database"));
const i18n_1 = __importDefault(require("./config/i18n"));
const AuthenticationController_1 = __importDefault(require("./controller/AuthenticationController"));
const CityController_1 = __importDefault(require("./controller/CityController"));
const ClassController_1 = __importDefault(require("./controller/ClassController"));
const ClassroomController_1 = __importDefault(require("./controller/ClassroomController"));
const CountryController_1 = __importDefault(require("./controller/CountryController"));
const CustomerController_1 = __importDefault(require("./controller/CustomerController"));
const EmployeeController_1 = __importDefault(require("./controller/EmployeeController"));
const FinancialController_1 = __importDefault(require("./controller/FinancialController"));
const GrateController_1 = __importDefault(require("./controller/GrateController"));
const MatriculationController_1 = __importDefault(require("./controller/MatriculationController"));
const NoticeController_1 = __importDefault(require("./controller/NoticeController"));
const PaymentConditionController_1 = __importDefault(require("./controller/PaymentConditionController"));
const PayrollController_1 = __importDefault(require("./controller/PayrollController"));
const PersonController_1 = __importDefault(require("./controller/PersonController"));
const PriceTableController_1 = __importDefault(require("./controller/PriceTableController"));
const ProductController_1 = __importDefault(require("./controller/ProductController"));
const RolePaymentController_1 = __importDefault(require("./controller/RolePaymentController"));
const SaleController_1 = __importDefault(require("./controller/SaleController"));
const StateController_1 = __importDefault(require("./controller/StateController"));
const SupplierController_1 = __importDefault(require("./controller/SupplierController"));
const AuthorizationFlow_1 = __importDefault(require("./flow/authorization/AuthorizationFlow"));
const express_http_context_1 = __importDefault(require("express-http-context"));
class StartUp {
    constructor() {
        this.swaggerFile = (process.cwd() + "/postman/schemas/schema.json");
        this.swaggerData = fs.readFileSync(this.swaggerFile, 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
        this.app = (0, express_1.default)();
        Database_1.default.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,PATCH,DELETE",
            origin: "*"
        };
        this.app.use((0, cors_1.default)(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json({ limit: '200mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        this.app.use(bodyParser.text({ limit: '200mb' }));
        this.app.use(express_http_context_1.default.middleware);
        this.app.use((request, response, next) => {
            express_http_context_1.default.set('headers', request.headers);
            next();
        });
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
        // this.app.route('/api/v2/product').get(ProductController.get)
        // this.app.route('/api/v2/product/:id').get(ProductController.getById)
        // this.app.route('/api/v2/product').post(ProductController.create)
        // this.app.route('/api/v2/product/:id').patch(ProductController.update)
        // this.app.route('/api/v2/product/:id').delete(ProductController.delete)
        this.app.route('/api/v2/role-payment').get(RolePaymentController_1.default.get);
        this.app.route('/api/v2/role-payment/:id').get(RolePaymentController_1.default.getById);
        this.app.route('/api/v2/role-payment').post(RolePaymentController_1.default.create);
        this.app.route('/api/v2/role-payment/:id').patch(RolePaymentController_1.default.update);
        this.app.route('/api/v2/role-payment/:id').delete(RolePaymentController_1.default.delete);
        this.app.route('/api/v2/price-table').get(PriceTableController_1.default.get);
        this.app.route('/api/v2/price-table/:id').get(PriceTableController_1.default.getById);
        this.app.route('/api/v2/price-table').post(PriceTableController_1.default.create);
        this.app.route('/api/v2/price-table/:id').patch(PriceTableController_1.default.update);
        this.app.route('/api/v2/price-table/:id').delete(PriceTableController_1.default.delete);
        this.app.route('/api/v2/classroom').get(ClassroomController_1.default.get);
        this.app.route('/api/v2/classroom/:id').get(ClassroomController_1.default.getById);
        this.app.route('/api/v2/classroom').post(ClassroomController_1.default.create);
        this.app.route('/api/v2/classroom/:id').patch(ClassroomController_1.default.update);
        this.app.route('/api/v2/classroom/:id').delete(ClassroomController_1.default.delete);
        this.app.route('/api/v2/class').get(ClassController_1.default.get);
        this.app.route('/api/v2/class/:id').get(ClassController_1.default.getById);
        this.app.route('/api/v2/class').post(ClassController_1.default.create);
        this.app.route('/api/v2/class/:id').patch(ClassController_1.default.update);
        this.app.route('/api/v2/class/:id').delete(ClassController_1.default.delete);
        this.app.route('/api/v2/person').get(PersonController_1.default.get);
        this.app.route('/api/v2/financial').get(FinancialController_1.default.get);
        this.app.route('/api/v2/financial/:id').get(FinancialController_1.default.getById);
        this.app.route('/api/v2/financial').post(FinancialController_1.default.create);
        this.app.route('/api/v2/financial/:id').patch(FinancialController_1.default.update);
        this.app.route('/api/v2/financial/:id').delete(FinancialController_1.default.delete);
        this.app.route('/api/v2/financial/payment/:id').patch(FinancialController_1.default.payment);
        this.app.route('/api/v2/financial/print-receipt/:id').get(FinancialController_1.default.printReceipt);
        this.app.route('/api/v2/matriculation').get(MatriculationController_1.default.get);
        this.app.route('/api/v2/matriculation/:id').get(MatriculationController_1.default.getById);
        this.app.route('/api/v2/matriculation').post(MatriculationController_1.default.create);
        this.app.route('/api/v2/matriculation/:id').patch(MatriculationController_1.default.update);
        this.app.route('/api/v2/matriculation/:id').delete(MatriculationController_1.default.delete);
        this.app.route('/api/v2/matriculation/financial/class-sku/:id').post(MatriculationController_1.default.generateFinancialClassSku);
        this.app.route('/api/v2/matriculation/financial/extra-sku/:id').post(MatriculationController_1.default.generateFinancialExtraSku);
        this.app.route('/api/v2/payroll').get(PayrollController_1.default.get);
        this.app.route('/api/v2/payroll/:id').get(PayrollController_1.default.getById);
        this.app.route('/api/v2/payroll').post(PayrollController_1.default.create);
        this.app.route('/api/v2/payroll/:id').delete(PayrollController_1.default.delete);
        this.app.route('/api/v2/payroll/pre-process').post(PayrollController_1.default.preProcess);
        this.app.use(CustomerController_1.default.routers);
        this.app.use(ProductController_1.default.routers);
        this.app.use(SaleController_1.default.routers);
    }
}
exports.default = new StartUp();
