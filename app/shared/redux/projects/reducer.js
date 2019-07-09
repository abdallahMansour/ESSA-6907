/*
 *
 * Projects reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const projectsReducer = (state = initialState, action) =>
  produce(state, draft => {
    let projectPos
    switch (action.type) {
      case CONSTANTS.FETCH_PROJECTS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_PROJECTS_SUCCESS:
        draft.data = action.projects
        draft.loading = false
        break
      case CONSTANTS.FETCH_PROJECTS_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_PROJECT_SUCCESS:
        draft.data.push(action.project)
        draft.loading = false
        break
      case CONSTANTS.ADD_PROJECT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_PROJECT_SUCCESS:
        projectPos = draft.data.findIndex(p => p.id === action.projectId)
        draft.data.splice(projectPos, 1)
        draft.loading = false
        break
      case CONSTANTS.DELETE_PROJECT_FAILURE:
        draft.loading = false
        break
    }
  })

export default projectsReducer
