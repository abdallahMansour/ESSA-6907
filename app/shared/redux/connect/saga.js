import { put, takeEvery, all, takeLatest, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as api from 'shared/services/connect.service'
import * as CONSTANTS from './constants'

const delay = ms => new Promise(res => setTimeout(res, ms))
export function* getLocation(action) {
  try {
    yield call(api.getLocation)
    yield put({ type: CONSTANTS.GET_LOCATION_SUCCESS })
  } catch (e) {
    yield put({ type: CONSTANTS.GET_LOCATION_FAILURE })
  }
}
export function* getLocationWatcher() {
  yield takeEvery(CONSTANTS.GET_LOCATION_REQUEST, getLocation)
}
