import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as fs from 'fs'
import * as swagger from 'swagger-ui-express'
import Database from './config/Database'
import i18n from './config/i18n'
import AuthenticationController from './controller/AuthenticationController'
import CityController from './controller/CityController'
import CountryController from './controller/CountryController'
import EmployeeController from './controller/EmployeeController'
import StateController from './controller/StateController'
import AuthorizationFlow from './flow/authentication/AuthorizationFlow'

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
    this.app.route('/api/v2/employee/:id').delete(EmployeeController.delete)
  }
}

export default new StartUp()