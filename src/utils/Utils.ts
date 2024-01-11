class Utils {

  isNotEmpty(obj) {
    return !this.isEmpty(obj)
  }
  
  isEmpty(obj) {
    if (!obj) {
      return true
    }

    if (Array.isArray(obj)) {
      if (obj.length == 0) {
        return true
      }
    }

    return false
  }

  isIterable(input) {  
    if (input === null || input === undefined) {
      return false
    }
  
    return typeof input[Symbol.iterator] === 'function'
  }

  isNotIterable(input) {  
    return !this.isIterable(input)
  }

  trunc(value: number, decimalPlates = 0): number {
    if (value === undefined || isNaN(value)) {
      return value;
    }
  
    const factor = 10 ** decimalPlates;
    let rounded = Math.trunc(value * factor) / factor;
    return rounded;
  }
  
  round(value: number, decimalPlates = 0): number {
    if (value === undefined || isNaN(value)) {
      return value;
    }
    value = this.trunc(value, decimalPlates + 1);
    const factor = 10 ** decimalPlates;
    let rounded = Math.round(value * factor) / factor;
    return rounded;
  }

  isInteger (value: any) {
    let result = false
    if (Number.isInteger(parseInt(value))) {
      result = true
    }
    return result
  }

  clearNumber (value: any): number {
    let result = ''
    if (value) {
      let flag = false
      const arrayValue = value.toString().split('')
      for (let i = 0; i < arrayValue.length; i++) {
        if (this.isInteger(arrayValue[i])) {
          if (!flag) {
            // Retirar zeros à esquerda
            if (arrayValue[i] !== '0') {
              result = result + arrayValue[i]
              flag = true
            } else {
              // Permitir zero quando valor igual a zero - Tipo 3 (Money or Percent)
              if (Number(value) === 0) {
                result = result + arrayValue[i]
              }
            }
          } else {
            result = result + arrayValue[i]
          }
        } else if (arrayValue[i] === '-') {
          result = result + arrayValue[i]
        }
      }
    }
    return Number(result)
  }
  
  centsToDecimal (value: any) {
    value = this.clearNumber(value)
    return (Number(value) / 100).toFixed(2)
  }

  toMoneyBR (value: number) {
    const v = this.centsToDecimal(value)
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}

export default new Utils