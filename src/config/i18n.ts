import { isNotEmpty } from 'c2-mongoose/dist/utils/Utils';
import en from '../../resources/messages/en'
import pt_BR from '../../resources/messages/pt_BR';
import httpContext from 'express-http-context'

const i18nCreate = require('express-rest-i18n')

export const i18n = i18nCreate({
  defaultLocale: 'pt-br',
  warn: false, // optional
  allowFallback: true, // optional
  messages: {
    'en': en,
    'en-US': en,
    'en_US': en,
    'pt': pt_BR,
    'pt-br': pt_BR,
    'pt_BR': pt_BR
  },
});

export const getMessage = (message: string, ...parameters: string[]): string => {
  const headers = httpContext.get('headers') as any
  var language: [] = []
  if (typeof headers !== 'undefined') {
    if (headers["accept-language"] !== undefined) {
      language = headers["accept-language"].split(',')
    }
  }

  var t = i18n.t(message)
  if (isNotEmpty(language)) {
    t = i18n.t(message, language)
  }

  for (var i = 0; i < parameters.length; i++) {
    var param = parameters[i]
    t = t.replaceAll(`{${i}}`, param)
  }
  return t
}

export default i18n