/*
 *
 * Profile actions
 *
 */
import * as CONSTANTS from './constants'

export function setRole(role) {
  return {
    type: CONSTANTS.SET_ROLE_REQUEST,
    role,
  }
}
