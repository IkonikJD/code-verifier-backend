import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUserController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM - Users Collections
import { deleteUserByID, getAllUsers, getUserByID, createUser, updateUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retreive the Users in the Collection "Users" of DB
   * @param {string} id Id of user to retreive (optional)
   * @returns All user o user found by ID
   */
  @Get('/')
  public async getUsers (@Query() id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Get User by ID: ${id}`)
      response = await getUserByID(id)

      // Remove the password
      response.password = ''
    } else {
      LogSuccess('[/api/users] Get All Users Request')
      response = await getAllUsers()
    }

    return response
  }

  /**
   * Endpoint to delete the Users in the Collection "Users" of DB
   * @param {string} id Id of user to delete (optional)
   * @returns message informing if deletion was correct
   */
  @Delete('/')
  public async deleteUser (@Query() id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Delete User by ID: ${id}`)
      await deleteUserByID(id).then((r) => {
        response = {
          message: `User with id: ${id} deleted successfully`
        }
      })
    } else {
      LogSuccess('[/api/users] Delete User Request WITHOUT ID')

      response = {
        message: 'Please, provide an ID to remove from database'
      }
    }

    return response
  }

  @Put('/')
  public async updateUser (@Query() id: string, user: any): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Update User by ID: ${id}`)
      await updateUserById(id, user).then((r) => {
        response = {
          message: `User with id: ${id} updated successfully`
        }
      })
    } else {
      LogWarning('[/api/users] Update User Request WITHOUT ID')
      response = {
        message: 'Please, provide an ID to update an existing user'
      }
    }

    return response
  }
}
