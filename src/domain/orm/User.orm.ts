import { userEntity } from '../entities/User.entity'
import { LogSuccess, LogError } from '../../utils/logger'
import { IUser } from '../../domain/interfaces/IUser.interface'
import { IAuth } from '../../domain/interfaces/IAuth.interface'

// Enviroment variables
import dotenv from 'dotenv'

// BCRYPT form passwords
import bcrypt from 'bcrypt'

// JWT
import jwt from 'jsonwebtoken'

// Configuration of enviroment variables
dotenv.config()

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}

// - Get User By ID
export const getUserByID = async (id: string) : Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Search User by ID
    return await userModel.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by ID: ${error}`)
  }
}

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Delete User By ID
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User by ID: ${error}`)
  }
}

// - Create New User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / Insert new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`)
  }
}

// - Update User By ID
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Update User
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User by ID:${id}: ${error}`)
  }
}

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / Insert new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`)
  }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    let userFound: IUser | undefined
    // eslint-disable-next-line no-undef-init
    let token = undefined

    // Check if user exists by Unique Email
    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound = user
    }).catch((error) => {
      console.error('[ERROR Authentication in ORM]: User Not Found')
      throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`)
    })

    // Check if Password is Valid (compare with bcrypt)
    const validPassword = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPassword) {
      console.error('[ERROR Authentication in ORM]: Password Not Valid')
      throw new Error('[ERROR Authentication in ORM]: Password Not Valid')
    }

    // Generate our JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    })

    return {
      user: userFound,
      token: token
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User by ID: ${error}`)
  }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {

}
