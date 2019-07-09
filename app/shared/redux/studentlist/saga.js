import { takeEvery, call, put, all } from 'redux-saga/effects'
import * as api from 'shared/services/students.service'
import * as CONSTANTS from './constants'

export function* getStudents() {
  try {
    const data = yield call(api.getStudents)

    yield put({ type: CONSTANTS.GET_STUDENTS_SUCCESS, students: data })
  } catch (e) {
    console.log(e)
    yield put({ type: CONSTANTS.GET_STUDENTS_FAILURE })
  }
}
export function* getStudentsWatcher() {
  yield takeEvery(CONSTANTS.GET_STUDENTS_REQUEST, getStudents)
}

export default function* studentListSaga() {
  yield all([getStudentsWatcher()])
}
