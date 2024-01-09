import { Request, Response } from "express";
import { Controller, ControllerOptions, HttpDispatchHandling } from "./Controller";

abstract class CrudController extends Controller {

  constructor(options: Partial<ControllerOptions>) {
    super(options)

    this.searchRunner = this.searchRunner.bind(this);
    this.getByIdRunner = this.getByIdRunner.bind(this);
    this.createRunner = this.createRunner.bind(this);
    this.updateRunner = this.updateRunner.bind(this);
    this.deleteRunner = this.deleteRunner.bind(this);

    this.routers.get(`${this.options.uri}/:id`, this.getByIdRunner)
    this.routers.get(`${this.options.uri}`, this.searchRunner)
    this.routers.post(`${this.options.uri}`, this.createRunner)
    this.routers.patch(`${this.options.uri}/:id`, this.updateRunner)
    this.routers.delete(`${this.options.uri}/:id`, this.deleteRunner)

  }

  abstract search(request: Request, response: Response): Promise<[number, any]>
  abstract getById(request: Request, response: Response): Promise<[number, any]>
  abstract create(request: Request, response: Response): Promise<[number, any]>
  abstract update(request: Request, response: Response): Promise<[number, any]>
  abstract delete(request: Request, response: Response): Promise<[number, any]>

  @HttpDispatchHandling
  async searchRunner(request: Request, response: Response): Promise<[number, any]> {
    return await this.search(request, response)
  }

  @HttpDispatchHandling
  async getByIdRunner(request: Request, response: Response): Promise<[number, any]> {
    return await this.getById(request, response)
  }

  @HttpDispatchHandling
  async createRunner(request: Request, response: Response): Promise<[number, any]> {
    return await this.create(request, response)
  }

  @HttpDispatchHandling
  async updateRunner(request: Request, response: Response): Promise<[number, any]> {
    return await this.update(request, response)
  }

  @HttpDispatchHandling
  async deleteRunner(request: Request, response: Response): Promise<[number, any]> {
    return await this.delete(request, response)
  }
}

export { CrudController };
