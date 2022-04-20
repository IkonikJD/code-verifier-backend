import { BasicResponse } from '@controller/types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController {
  // Real all users from databse
  getUsers(id?: string): Promise<any>

  // Delete User By ID
  deleteUser(id?: string): Promise<any>

  // Create New User
  createUser(user: any): Promise<any>

  // Update User
  updateUser(id: string, user: any): Promise<any>
}
