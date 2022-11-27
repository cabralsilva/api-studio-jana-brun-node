import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as fs from 'fs'
import * as swagger from 'swagger-ui-express'
import Database from './config/Database'
import i18n from './config/i18n'

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
    this.app.use('/api/v1/docs', swagger.serve, swagger.setup(this.swaggerDocument))
    this.app.use(i18n.middleware);
  }

  routes() {
    this.app.route('/').get((_req, res) => {
      res.send({ application: "api-studio-jana-brun", version: '0.0.1' })
    })
    this.app.route('/api/v1/test').get((req: any, res: any) => {
      // const response = req["polyglot"].t('emailRequiredField');
      const helloWorld = `${res.i18n.t('message.test', 'pt-br')} ${res.i18n.t('message.test', 'en')}`;
      res.status(200);
      res.send(helloWorld);
    })
    //ROUTES UNAUTHENTICATED ABOVE
    // this.app.use(AuthServiceHttp.validate)
    //ROUTES AUTHENTICATED BELOW
  }
}

export default new StartUp()