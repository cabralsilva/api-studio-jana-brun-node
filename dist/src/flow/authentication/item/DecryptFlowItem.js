class DecryptFlowItem {
    decryptCredentials(req) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            this.processError(new HttpError(HttpStatus.UNAUTHORIZED, 'Invalid request'));
        }
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii').split(":");
        return {
            email: credentials[0],
            password: credentials[1]
        };
    }
}
