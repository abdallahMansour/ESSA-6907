/*
 *
 * StudentList reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const studentListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.GET_STUDENTS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.GET_STUDENTS_SUCCESS:
        draft.data = action.students
        draft.loading = false
        break
      case CONSTANTS.GET_STUDENTS_FAILURE:
        draft.loading = false
        break
    }
  })

export default studentListReducer
