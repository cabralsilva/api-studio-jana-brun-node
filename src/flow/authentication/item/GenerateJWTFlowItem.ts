import * as jwt from 'jsonwebtoken';
import { jwtExpireTimeInHour, jwtSecret } from "../../../config/Configs";

class GenerateJWTFlowItem {
  async generate(employee: any) {
    var now = new Date()
    var exp = new Date(now)
    exp.setMinutes(now.getMinutes() + (60 * Number(jwtExpireTimeInHour)))
    let payload = {
      iss: "api-studio-jana-brun",
      iat: now.getTime(),
      exp: exp.getTime(),
      holder: employee._id
    }

    return jwt.sign(payload, jwtSecret)
  }
}

export default new GenerateJWTFlowItem