import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as fs from 'fs'
import * as swagger from 'swagger-ui-express'
import Database from './config/Database'
import i18n from './config/i18n'
import AuthenticationController from './controller/AuthenticationController'
import CityController from './controller/CityController'
import ClassController from './controller/ClassController'
import ClassroomController from './controller/ClassroomController'
import CountryController from './controller/CountryController'
import EmployeeController from './controller/EmployeeController'
import GrateController from './controller/GrateController'
import NoticeController from './controller/NoticeController'
import PaymentConditionController from './controller/PaymentConditionController'
import PriceTableController from './controller/PriceTableController'
import ProductController from './controller/ProductController'
import RolePaymentController from './controller/RolePaymentController'
import StateController from './controller/StateController'
import SupplierController from './controller/SupplierController'
import AuthorizationFlow from './flow/authorization/AuthorizationFlow'

class StartUp {
  public app: express.Application
  private _db: Database
  private bodyParser

  private swaggerFile: any = (process.cwd() + "/postman/schemas/schema.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor() {
    this.app = express()
    this._db = new Database()
    this._db.createConnection()
    this.middler()
    this.routes()
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,PATCH,DELETE",
      origin: "*"
    }
    this.app.use(cors(options))
  }

  middler() {
    this.enableCors()
    this.app.use(bodyParser.json({ limit: '200mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
    this.app.use(bodyParser.text({ limit: '200mb' }))
    this.app.use('/api/v2/docs', swagger.serve, swagger.setup(this.swaggerDocument))
    this.app.use(i18n.middleware);
  }

  routes() {
    this.app.route('/').get((_req, res) => {
      res.send({ application: "api-studio-jana-brun", version: '0.0.1' })
    })
    this.app.route('/api/v2/test').get((req: any, res: any) => {
      const helloWorld = `${res.i18n.t('message.test', 'pt-br')} ${res.i18n.t('message.test', 'en')}`;
      res.status(200);
      res.send(helloWorld);
    })

    this.app.route('/api/v2/authenticator').post(AuthenticationController.authenticate)
    //ROUTES UNAUTHENTICATED ABOVE
    this.app.use(AuthorizationFlow.authorization)
    //ROUTES AUTHENTICATED BELOW
    this.app.route('/api/v2/country').get(CountryController.get)
    this.app.route('/api/v2/country/:id').get(CountryController.getById)
    this.app.route('/api/v2/country').post(CountryController.create)
    this.app.route('/api/v2/country/:id').patch(CountryController.update)
    this.app.route('/api/v2/country/:id').delete(CountryController.delete)

    this.app.route('/api/v2/state').get(StateController.get)
    this.app.route('/api/v2/state/:id').get(StateController.getById)
    this.app.route('/api/v2/state').post(StateController.create)
    this.app.route('/api/v2/state/:id').patch(StateController.update)
    this.app.route('/api/v2/state/:id').delete(StateController.delete)

    this.app.route('/api/v2/city').get(CityController.get)
    this.app.route('/api/v2/city/:id').get(CityController.getById)
    this.app.route('/api/v2/city').post(CityController.create)
    this.app.route('/api/v2/city/:id').patch(CityController.update)
    this.app.route('/api/v2/city/:id').delete(CityController.delete)

    this.app.route('/api/v2/employee').get(EmployeeController.get)
    this.app.route('/api/v2/employee/:id').get(EmployeeController.getById)
    this.app.route('/api/v2/employee').post(EmployeeController.create)
    this.app.route('/api/v2/employee/:id').patch(EmployeeController.update)
    this.app.route('/api/v2/employee/update/password').patch(EmployeeController.updatePassword)
    this.app.route('/api/v2/employee/:id').delete(EmployeeController.delete)

    this.app.route('/api/v2/notice').get(NoticeController.get)
    this.app.route('/api/v2/notice/:id').get(NoticeController.getById)
    this.app.route('/api/v2/notice').post(NoticeController.create)
    this.app.route('/api/v2/notice/:id').patch(NoticeController.update)
    this.app.route('/api/v2/notice/:id').delete(NoticeController.delete)

    this.app.route('/api/v2/payment-condition').get(PaymentConditionController.get)
    this.app.route('/api/v2/payment-condition/:id').get(PaymentConditionController.getById)
    this.app.route('/api/v2/payment-condition').post(PaymentConditionController.create)
    this.app.route('/api/v2/payment-condition/:id').patch(PaymentConditionController.update)
    this.app.route('/api/v2/payment-condition/:id').delete(PaymentConditionController.delete)

    this.app.route('/api/v2/supplier').get(SupplierController.get)
    this.app.route('/api/v2/supplier/:id').get(SupplierController.getById)
    this.app.route('/api/v2/supplier').post(SupplierController.create)
    this.app.route('/api/v2/supplier/:id').patch(SupplierController.update)
    this.app.route('/api/v2/supplier/:id').delete(SupplierController.delete)

    this.app.route('/api/v2/grate').get(GrateController.get)
    this.app.route('/api/v2/grate/:id').get(GrateController.getById)
    this.app.route('/api/v2/grate').post(GrateController.create)
    this.app.route('/api/v2/grate/:id').patch(GrateController.update)
    this.app.route('/api/v2/grate/:id').delete(GrateController.delete)

    this.app.route('/api/v2/product').get(ProductController.get)
    this.app.route('/api/v2/product/:id').get(ProductController.getById)
    this.app.route('/api/v2/product').post(ProductController.create)
    this.app.route('/api/v2/product/:id').patch(ProductController.update)
    this.app.route('/api/v2/product/:id').delete(ProductController.delete)

    this.app.route('/api/v2/role-payment').get(RolePaymentController.get)
    this.app.route('/api/v2/role-payment/:id').get(RolePaymentController.getById)
    this.app.route('/api/v2/role-payment').post(RolePaymentController.create)
    this.app.route('/api/v2/role-payment/:id').patch(RolePaymentController.update)
    this.app.route('/api/v2/role-payment/:id').delete(RolePaymentController.delete)

    this.app.route('/api/v2/price-table').get(PriceTableController.get)
    this.app.route('/api/v2/price-table/:id').get(PriceTableController.getById)
    this.app.route('/api/v2/price-table').post(PriceTableController.create)
    this.app.route('/api/v2/price-table/:id').patch(PriceTableController.update)
    this.app.route('/api/v2/price-table/:id').delete(PriceTableController.delete)

    this.app.route('/api/v2/classroom').get(ClassroomController.get)
    this.app.route('/api/v2/classroom/:id').get(ClassroomController.getById)
    this.app.route('/api/v2/classroom').post(ClassroomController.create)
    this.app.route('/api/v2/classroom/:id').patch(ClassroomController.update)
    this.app.route('/api/v2/classroom/:id').delete(ClassroomController.delete)

    this.app.route('/api/v2/class').get(ClassController.get)
    this.app.route('/api/v2/class/:id').get(ClassController.getById)
    this.app.route('/api/v2/class').post(ClassController.create)
    this.app.route('/api/v2/class/:id').patch(ClassController.update)
    this.app.route('/api/v2/class/:id').delete(ClassController.delete)
  }
}

export default new StartUp()