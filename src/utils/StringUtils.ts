import i18n from "../config/i18n"

class StringUtils {

  constructor() { }

  padToLeft(fill, amount, source) {
    source = source.toString()
    fill = fill.toString()
    return source.length < amount ? this.padToLeft(fill, amount, fill + source) : source
  }

  message(source: String, ...parameters: string[]): string {
    var message = i18n.t(source) as String
    for (var i = 0; i < parameters.length; i++) {
      var param = parameters[i]
      message = message.replaceAll(`{${i}}`, param)
    }
    return message as string
  }
}

export default new StringUtils