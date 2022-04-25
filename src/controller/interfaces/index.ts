import { BasicResponse } from '../types'
import { IUser } from '../../domain/interfaces/IUser.interface'

export interface IHelloController {
  getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController {
  // Real all users from databse
  getUsers(id?: string): Promise<any>

  // Delete User By ID
  deleteUser(id?: string): Promise<any>

  // Update User
  updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
  // Register Users
  registerUser(user: IUser): Promise<any>

  // Login User
  loginUser(auth: any): Promise<any>
}
