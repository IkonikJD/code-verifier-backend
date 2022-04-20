import { userEntity } from '../entities/User.entity'
import { LogSuccess, LogError } from '../../utils/logger'

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
    LogError(`[ORM ERROR]: Deleting User by ID: ${error}`)
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
