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
}

export default new Utils