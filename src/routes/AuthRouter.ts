import express, { Request, Response} from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// BCRYPT for password
import bcrypt from 'bcrypt'

// MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser (Read JSON from Body in Requests)
import bodyParser from 'body-parser'

// Middleware to read JSON in Body
const jsonParser = bodyParser.json()

// Router from express
const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { name, email, password, age } = req?.body
    let hashedPassword = ''

    if (name && email && password && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8)

      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age
      }

      // Controller Instance to excute method
      const controller: AuthController = new AuthController()

      // Obtain Response
      const response: any = await controller.registerUser(newUser)

      // Send to the client the response
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data missing]: No user can be registered'
      })
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { email, password } = req?.body

    if (email && password) {
    // Controller Instance to excute method
      const controller: AuthController = new AuthController()

      const auth: IAuth = {
        email: email,
        password: password
      }

      // Obtain Response
      const response: any = await controller.loginUser(auth)

      // Send to the client the response which includes the JWT to athorized request
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data missing]: No user can be registered'
      })
    }
  })

// Route Protected by VERIFY TOKEN Middleware
authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the ID of user to check it's data
    const id: any = req?.query?.id

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController()

      // Obtain response from Controller
      const response: any = await controller.userData(id)

      // If user is athorised:
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'You are not athorised to perform this action'
      })
    }
  })

export default authRouter
