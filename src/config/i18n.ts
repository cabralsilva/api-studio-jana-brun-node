import en from '../../resources/messages/en'
import pt_BR from '../../resources/messages/pt_BR';

const i18nCreate = require('express-rest-i18n')

const i18n = i18nCreate({
  defaultLocale: 'en',
  warn: false, // optional
  allowFallback: true, // optional
  messages: {
    'en': en,
    'pt-br': pt_BR
  },
});

export default i18n