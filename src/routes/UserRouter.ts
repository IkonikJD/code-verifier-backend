import { BasicResponse } from '@controller/types'
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersControllers'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// GET -> http://localhost:8000/api/users?id=62602eb46c9d012822e99550
usersRouter.route('/')
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.getUsers(id)
    // Send to the client the response
    return res.send(response)
  })

  // DELETE:
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.deleteUser(id)
    // Send to the client the response
    return res.send(response)
  })

  // POST
  .post(async (req: Request, res: Response) => {
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name || 'default',
      email: email || 'default email',
      age: age || 18
    }

    // Obtain Response
    const response: any = await controller.createUser(user)
    // Send to the client the response
    return res.send(response)
  })

  // PUT
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`)

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name,
      email: email,
      age: age
    }

    // Obtain Response
    const response: any = await controller.updateUser(id, user)

    // Send to the client the response
    return res.send(response)
  })

// Export User Router
export default usersRouter
