import { put, takeEvery, all } from 'redux-saga/effects'
import * as CONSTANTS from './constants'

// Individual exports for testing
export function* setRole(action) {
  try {
    yield put({
      type: CONSTANTS.SET_ROLE_SUCCESS,
      role: action.role,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({ type: CONSTANTS.SET_ROLE_FAILURE })
  }
}

export function* setRoleWatcher() {
  yield takeEvery(CONSTANTS.SET_ROLE_REQUEST, setRole)
}
export default function* profileSaga() {
  yield all([setRoleWatcher()])
}
