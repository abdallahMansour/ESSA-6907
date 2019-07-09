/*
 *
 * Connect actions
 *
 */
import * as CONSTANTS from './constants'

export function defaultAction() {
  return {
    type: CONSTANTS.DEFAULT_ACTION,
  }
}
export function getLocation() {
  return {
    type: CONSTANTS.GET_LOCATION_REQUEST,
  }
}
