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
exports.errorHandling = exports.ErrorHandler = exports.HttpError = exports.Http = void 0;
const express_http_context_1 = __importDefault(require("express-http-context"));
const http_status_1 = require("http-status");
class Http {
    constructor() {
        this.tryError = (error) => {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(http_status_1.INTERNAL_SERVER_ERROR, error.message, { requestId: express_http_context_1.default.get('rid'), error });
        };
        this.dispatchSuccess = (response, status, payload) => {
            response.status(status).json(payload);
        };
        this.dispatchDownload = (response, status, file) => {
            response.status(status).send(file);
        };
        this.dispatchSuccessPayload = (response, status, payload) => {
            response.status(status).json({ payload });
        };
        this.dispatchError = (response, error) => {
            var _a, _b;
            response.status(error.status || http_status_1.INTERNAL_SERVER_ERROR).json({ message: error.message, detail: (_b = (_a = error.detail) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : error.detail });
        };
    }
}
exports.Http = Http;
class HttpError extends Error {
    constructor(status, message, detail = undefined) {
        super(message);
        this.status = status;
        this.detail = detail;
        this.message = message;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.HttpError = HttpError;
function ErrorHandler(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            // Get the property names of the class instance
            const propertyNames = Object.getOwnPropertyNames(this);
            // Iterate through each property name
            for (const propertyName of propertyNames) {
                // Check if the property is a method
                const propertyValue = this[propertyName];
                if (typeof propertyValue === 'function') {
                    // Override the method with error handling logic
                    this[propertyName] = function (...args) {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                return yield propertyValue.apply(this, args);
                            }
                            catch (error) {
                                console.error(error);
                                // Handle the error here
                                throw new Error('An error occurred.');
                            }
                        });
                    };
                }
            }
        }
    };
}
exports.ErrorHandler = ErrorHandler;
function errorHandling(constructor) {
    return class extends constructor {
        constructor(...args) {
            super(...args);
            // Get the property names of the class prototype
            const prototype = Object.getPrototypeOf(this);
            const propertyNames = Object.getOwnPropertyNames(prototype);
            // Iterate through each property name
            for (const propertyName of propertyNames) {
                // Check if the property is a method
                const propertyDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
                if (((propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.value) instanceof Function ||
                    (propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.get) instanceof Function) &&
                    propertyName !== 'constructor') {
                    // Override the method with error handling logic
                    const originalMethod = propertyDescriptor.value || propertyDescriptor.get;
                    Object.defineProperty(prototype, propertyName, {
                        value: function (...args) {
                            return __awaiter(this, void 0, void 0, function* () {
                                try {
                                    return yield originalMethod.apply(this, args);
                                }
                                catch (error) {
                                    console.error(error);
                                    // Handle the error here
                                    throw new Error('An error occurred.');
                                }
                            });
                        },
                    });
                }
            }
        }
    };
}
exports.errorHandling = errorHandling;
exports.default = new Http;
