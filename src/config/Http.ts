import { Response } from "express";
import httpContext from "express-http-context";
import { INTERNAL_SERVER_ERROR } from "http-status";

export class Http {
    public tryError = (error: Error) => {

        if (error instanceof HttpError) {
            throw error
        }

        throw new HttpError(INTERNAL_SERVER_ERROR, error.message, { requestId: httpContext.get('rid'), error })
    }

    public dispatchSuccess = (response: Response, status: number, payload?: any) => {
        response.status(status).json(payload)
    }

    public dispatchDownload = (response: Response, status: number, file?: any) => {
        response.status(status).send(file)
    }

    public dispatchSuccessPayload = (response: Response, status: number, payload?: any) => {
        response.status(status).json({ payload })
    }

    public dispatchError = (response: Response, error: HttpError) => {
        response.status(error.status || INTERNAL_SERVER_ERROR).json({ message: error.message, detail: error.detail?.data ?? error.detail })
    }
}

export class HttpError extends Error {
    status: number
    detail: any
    message: string;
    constructor(status: number, message: string, detail: any = undefined) {
        super(message);
        this.status = status
        this.detail = detail
        this.message = message
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export function ErrorHandler<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            // Get the property names of the class instance
            const propertyNames = Object.getOwnPropertyNames(this);

            // Iterate through each property name
            for (const propertyName of propertyNames) {
                // Check if the property is a method
                const propertyValue = this[propertyName];
                if (typeof propertyValue === 'function') {
                    // Override the method with error handling logic
                    this[propertyName] = async function (...args: any[]) {
                        try {
                            return await propertyValue.apply(this, args);
                        } catch (error) {
                            console.error(error);
                            // Handle the error here
                            throw new Error('An error occurred.');
                        }
                    };
                }
            }
        }
    };
}

export function errorHandling<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            // Get the property names of the class prototype
            const prototype = Object.getPrototypeOf(this);
            const propertyNames = Object.getOwnPropertyNames(prototype);

            // Iterate through each property name
            for (const propertyName of propertyNames) {
                // Check if the property is a method
                const propertyDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
                if (
                    (propertyDescriptor?.value instanceof Function ||
                        propertyDescriptor?.get instanceof Function) &&
                    propertyName !== 'constructor'
                ) {
                    // Override the method with error handling logic
                    const originalMethod = propertyDescriptor.value || propertyDescriptor.get;
                    Object.defineProperty(prototype, propertyName, {
                        value: async function (...args: any[]) {
                            try {
                                return await originalMethod.apply(this, args);
                            } catch (error) {
                                console.error(error);
                                // Handle the error here
                                throw new Error('An error occurred.');
                            }
                        },
                    });
                }
            }
        }
    };
}

export default new Http