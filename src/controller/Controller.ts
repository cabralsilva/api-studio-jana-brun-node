import { Router } from "express";
import Http from "../config/Http";
import { isEmpty } from "c2-mongoose/dist/utils/Utils";

interface ControllerOptions {
  uri: string,
  basePath: string,
  relativePath: string,
  prefixRole: string
  roles: string[]
  byPass: boolean
}

abstract class Controller {

  public routers: Router = Router();
  protected options: Partial<ControllerOptions>

  constructor(_options: Partial<ControllerOptions>) {

    this.options = _options

    if (!this.options.relativePath.startsWith("/")) {
      throw new Error("the 'relativePatch' must start with a slash '/'")
    }

    if (isEmpty(this.options.basePath)) {
      this.options.basePath = `/api/v2`
    }

    if (isEmpty(this.options.roles)) {
      this.options.roles = [];
    }

    if (isEmpty(this.options.prefixRole)) {
      let defaultPrefixRole = this.options.relativePath
      if (defaultPrefixRole.startsWith("/")) {
        defaultPrefixRole = defaultPrefixRole.replace("/", "")
      }
      this.options.prefixRole = defaultPrefixRole.replaceAll("/", "-")
    }

    this.options.uri = `${this.options.basePath}${this.options.relativePath}`
  }
}

function HttpDispatchHandling(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args) {
    let [request, response, next] = args
    try {
      let [status, data] = await originalMethod.apply(this, args);
      return Http.dispatchSuccess(response, status, data);
    } catch (error) {
      console.error(error)
      Http.dispatchError(response, error)
    }
  };

  return descriptor;
}

function HttpDispatchDownload(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args) {
    let [request, response, next] = args
    try {
      let [status, data] = await originalMethod.apply(this, args);
      return Http.dispatchDownload(response, status, data);
    } catch (error) {
      console.error(error)
      Http.dispatchError(response, error)
    }
  };

  return descriptor;
}

export { Controller, ControllerOptions, HttpDispatchDownload, HttpDispatchHandling };

