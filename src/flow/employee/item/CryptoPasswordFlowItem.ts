import * as crypto from 'crypto'

class CryptoPasswordFlowItem {
  crypto(decodePassword: any): { salt: string, password: string } {
    const salt = crypto.randomBytes(16).toString('hex')
    const password = crypto.pbkdf2Sync(decodePassword, salt, 1000, 64, `sha512`).toString(`hex`)

    return {
      salt,
      password
    }
  }
}

export default new CryptoPasswordFlowItem