"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpDispatchHandling = exports.HttpDispatchDownload = exports.Controller = void 0;
const express_1 = require("express");
const Http_1 = __importDefault(require("../config/Http"));
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
class Controller {
    constructor(_options) {
        this.routers = (0, express_1.Router)();
        this.options = _options;
        if (!this.options.relativePath.startsWith("/")) {
            throw new Error("the 'relativePatch' must start with a slash '/'");
        }
        if ((0, Utils_1.isEmpty)(this.options.basePath)) {
            this.options.basePath = `/api/v2`;
        }
        if ((0, Utils_1.isEmpty)(this.options.roles)) {
            this.options.roles = [];
        }
        if ((0, Utils_1.isEmpty)(this.options.prefixRole)) {
            let defaultPrefixRole = this.options.relativePath;
            if (defaultPrefixRole.startsWith("/")) {
                defaultPrefixRole = defaultPrefixRole.replace("/", "");
            }
            this.options.prefixRole = defaultPrefixRole.replaceAll("/", "-");
        }
        this.options.uri = `${this.options.basePath}${this.options.relativePath}`;
    }
}
exports.Controller = Controller;
function HttpDispatchHandling(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let [request, response, next] = args;
            try {
                let [status, data] = yield originalMethod.apply(this, args);
                return Http_1.default.dispatchSuccess(response, status, data);
            }
            catch (error) {
                console.error(error);
                Http_1.default.dispatchError(response, error);
            }
        });
    };
    return descriptor;
}
exports.HttpDispatchHandling = HttpDispatchHandling;
function HttpDispatchDownload(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let [request, response, next] = args;
            try {
                let [status, data] = yield originalMethod.apply(this, args);
                return Http_1.default.dispatchDownload(response, status, data);
            }
            catch (error) {
                console.error(error);
                Http_1.default.dispatchError(response, error);
            }
        });
    };
    return descriptor;
}
exports.HttpDispatchDownload = HttpDispatchDownload;
