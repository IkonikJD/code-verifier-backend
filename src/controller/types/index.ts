/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string
}

/**
 * Error JSON responde for Controllers
 */
export type ErrorResponse = {
  error: string,
  message: string
}

/**
 * Auth JSON responde for Controllers
 */
export type AuthResponse = {
  token: string,
  message: string
}
