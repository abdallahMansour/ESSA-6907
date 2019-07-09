/*
 *
 * StudentList actions
 *
 */
import * as CONSTANTS from './constants'

export function getStudents(students) {
  return {
    type: CONSTANTS.GET_STUDENTS_REQUEST,
    students,
  }
}
