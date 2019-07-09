/*
 *
 * Issues reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const issuesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.FETCH_ISSUES_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_ISSUES_SUCCESS:
        draft.data = action.issues
        draft.loading = false
        break
      case CONSTANTS.FETCH_ISSUES_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_STATUS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_STATUS_SUCCESS:
        draft.data = draft.data.map(d => {
          if (d.id === action.issueId) {
            return {
              ...d,
              status: action.issue.status,
            }
          }
          return d
        })
        draft.loading = false
        break
      case CONSTANTS.UPDATE_STATUS_FAILURE:
        draft.loading = false
        break
    }
  })

export default issuesReducer
