import express, { Request, Response } from 'express'
import { HelloController } from '@controller/HelloController'
import { LogInfo } from '@utils/logger'

// Router from express
let helloRouter = express.Router()

// GET -> http://localhost:8000/api/hello?name=JDavid/
helloRouter.route('/')
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    let name: any = req?.query?.name
    LogInfo(`Query Param: ${name}`)
    // Controller Instance to excute method
    const controller: HelloController = new HelloController()
    // Obtain Response
    const response = await controller.getMessage(name)
    // Send to the client the response
    return res.send(response)
  })

// Export Hello router
export default helloRouter