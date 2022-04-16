import { BasicResponse } from '@controller/types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasicResponse>
}
