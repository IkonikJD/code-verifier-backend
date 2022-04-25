import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import dotenv from 'dotenv'

// Configuration of enviroment variables
dotenv.config()

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

/**
 *
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response} res Response to verification of JWT
 * @param { NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check Header from Request for 'x-access-token'
  const token: any = req.headers['x-access-token']

  // Verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authentication: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint'
    })
  }
  // Verify the token obtained. We pass the secret
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authentication: 'JWT verification failed',
        message: 'Failed to verify JWT token in request'
      })
    }

    // Execute Next Function -> Protected Routes will be executed
    next()
  })
}
