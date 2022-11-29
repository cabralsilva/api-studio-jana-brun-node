export const httpPort = process.env.PORT
export const jwtSecret = process.env.JWT_SECRET
export const jwtExpireTimeInHour = process.env.JWT_EXPIRE_TIME_IN_HOUR
export const dbUrl = process.env.DB_URL
export const dbCollation = process.env.DB_COLLACTION

export const sbaumUrlBase = process.env.SBAUM_URL_BASE
export const sbaumEnv = process.env.SBAUM_ENV
export const sbaumToken = process.env.SBAUM_TOKEN

export const pagarMeUrlBase = process.env.PAGAR_ME_URL_BASE
export const pagarMeSecretPublic = process.env.PAGAR_ME_SECRET_PUBLIC
export const pagarMeSecretPrivate = process.env.PAGAR_ME_SECRET_PRIVATE

export const mailerAddress = process.env.MAILER_ADDRESS
export const forgetPasswordLinkFormReset = process.env.FORGET_PASSWORD_LINK_FORM_RESET
export const sendGridKey = process.env.SENDGRID_API_KEY

export default process.env