/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '../utils/logger'
import { serve } from 'swagger-ui-express'
import usersRouter from './UserRouter'
import authRouter from './AuthRouter'

// Server instance
const server = express()

// Router instance
const rootRouter = express.Router()

// Activate for requests to http://localhost:8000/api

// Get: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/')
  // Send Hello World
  res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose')
})

// Redirections to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> HelloRouter

// Add more routes to the app
server.use('/users', usersRouter) // http://localhost:8000/api/users --> UserRouter
// Auth routes
server.use('/auth', authRouter) // http://localhost:8000/api/auth --> AuthRouter

// Export server
export default server
