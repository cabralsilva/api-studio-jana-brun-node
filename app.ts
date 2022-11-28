import Server from './src/server'
import { httpPort } from './src/config/Configs'

let port = httpPort || '5000'

Server.app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})