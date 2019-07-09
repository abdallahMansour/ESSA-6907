/*
 *
 * Connect reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const connectLandingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.GET_LOCATION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.GET_LOCATION_SUCCESS:
        draft.data = action.location
        draft.loading = false
        break
      case CONSTANTS.GET_LOCATION_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.GET_TECHNOLOGIES_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.GET_TECHNOLOGIES_SUCCESS:
        draft.data = action.technologies
        draft.loading = false
        break
      case CONSTANTS.GET_TECHNOLOGIES_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.POST_DEVELOPER_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.POST_DEVELOPER_SUCCESS:
        draft.data = action.status
        draft.loading = false
        break
      case CONSTANTS.POST_DEVELOPER_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.POST_ENTREPRISE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.POST_ENTREPRISE_SUCCESS:
        draft.data = action.entreprise
        draft.loading = false
        break
      case CONSTANTS.POST_ENTREPRISE_FAILURE:
        draft.loading = false
    }
  })

export default connectLandingReducer
