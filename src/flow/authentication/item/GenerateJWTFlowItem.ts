import * as jwt from 'jsonwebtoken';
import { jwtExpireTimeInHour, jwtSecret } from "../../../config/Configs";

class GenerateJWTFlowItem {
  async generate(credential: { username: string; password: string }) {
    var now = new Date()
    var exp = new Date(now)
    exp.setMinutes(now.getMinutes() + (60 * Number(jwtExpireTimeInHour)))
    let payload = {
      iss: "api-studio-jana-brun",
      iat: now.getTime(),
      exp: exp.getTime()
    }

    return jwt.sign(payload, jwtSecret)
  }
}

export default new GenerateJWTFlowItem