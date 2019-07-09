/*
 *
 * Projects actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchProjects() {
  return {
    type: CONSTANTS.FETCH_PROJECTS_REQUEST,
  }
}
export function addProject(project) {
  return {
    type: CONSTANTS.ADD_PROJECT_REQUEST,
    project,
  }
}
export function deleteProject(id) {
  return {
    type: CONSTANTS.DELETE_PROJECT_REQUEST,
    id,
  }
}