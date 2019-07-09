/*
 *
 * Connect actions
 *
 */
import * as CONSTANTS from './constants'

export function getLocation() {
  return {
    type: CONSTANTS.GET_LOCATION_REQUEST,
  }
}
export function getTechnologies(tech) {
  return {
    type: CONSTANTS.GET_TECHNOLOGIES_REQUEST,
    tech,
  }
}
export function postDevelepor(developer) {
  console.log('postDevelepor(developer)')
  return {
    type: CONSTANTS.POST_DEVELOPER_REQUEST,
    developer,
  }
}
export function postEntreprise(entreprise) {
  return {
    type: CONSTANTS.POST_ENTREPRISE_REQUEST,
    entreprise,
  }
}
