/*
 *
 * Connect reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const connectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.GET_LOCATION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.GET_LOCATION_SUCCESS:
        draft.loading = false
        break
      case CONSTANTS.GET_LOCATION_FAILURE:
        draft.loading = false
        break
    }
  })

export default connectReducer
