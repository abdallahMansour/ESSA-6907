/*
 *
 * Profile reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {
  loading: false,
  data: {},
}

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.SET_ROLE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.SET_ROLE_SUCCESS:
        draft.loading = false
        draft.data.role = action.role
        break
      case CONSTANTS.SET_ROLE_FAILURE:
        draft.loading = false
        break
    }
  })

export default profileReducer
