import { put, takeEvery, call, all } from 'redux-saga/effects'
import * as api from 'shared/services/connect.service'
import * as CONSTANTS from './constants'

export function* getLocation() {
  try {
    const data = yield call(api.getLocation)

    yield put({ type: CONSTANTS.GET_LOCATION_SUCCESS, location: data.model })
  } catch (e) {
    yield put({ type: CONSTANTS.GET_LOCATION_FAILURE })
  }
}
export function* getTechnologies(action) {
  try {
    const data = yield call(api.getTechnologies, action.tech)
    yield put({
      type: CONSTANTS.GET_TECHNOLOGIES_SUCCESS,
      technologies: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.GET_TECHNOLOGIES_FAILURE })
  }
}
export function* postDeveloper(action) {
  try {
    const data = yield call(api.postDeveloper, action.developer)
    console.log('kousssssssssay', data)
    yield put({
      type: CONSTANTS.POST_DEVELOPER_SUCCESS,
      status: data,
    })
  } catch (e) {
    console.log(e)
    yield put({ type: CONSTANTS.POST_DEVELOPER_FAILURE })
  }
}
export function* postEntreprise(action) {
  try {
    const data = yield call(api.postEntreprise, action.entreprise)
    yield put({
      type: CONSTANTS.POST_ENTREPRISE_SUCCESS,
      data,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.POST_ENTREPRISE_FAILURE })
  }
}
export function* getLocationWatcher() {
  yield takeEvery(CONSTANTS.GET_LOCATION_REQUEST, getLocation)
}
export function* getTechnologiesWatcher() {
  yield takeEvery(CONSTANTS.GET_TECHNOLOGIES_REQUEST, getTechnologies)
}
export function* postDeveloperWatcher() {
  console.log('postDeveloperWatcher')
  yield takeEvery(CONSTANTS.POST_DEVELOPER_REQUEST, postDeveloper)
}
export function* postEntrepriseWatcher() {
  yield takeEvery(CONSTANTS.POST_ENTREPRISE_REQUEST, postEntreprise)
}
export default function* connectLandingSaga() {
  yield all([
    getLocationWatcher(),
    getTechnologiesWatcher(),
    postDeveloperWatcher(),
    postEntrepriseWatcher(),
  ])
}
