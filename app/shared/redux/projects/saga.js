import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as api from 'shared/services/project.service'
import * as CONSTANTS from './constants'

export function* fetchProjects() {
  try {
    const data = yield call(api.fetchProjects)
    yield put({
      type: CONSTANTS.FETCH_PROJECTS_SUCCESS,
      projects: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_PROJECTS_FAILURE })
  }
}

export function* addProject(action) {
  try {
    const data = yield call(api.addProject, action.project)
    yield put({
      type: CONSTANTS.ADD_PROJECT_SUCCESS,
      project: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.ADD_PROJECT_FAILURE })
  }
}
export function* deleteProject(action) {
  try {
    yield call(api.deleteProject, action.id)
    yield put({
      type: CONSTANTS.DELETE_PROJECT_SUCCESS,
      projectId: action.id,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.DELETE_PROJECT_FAILURE })
  }
}

export function* fetchProjectsWatcher() {
  yield takeEvery(CONSTANTS.FETCH_PROJECTS_REQUEST, fetchProjects)
}
export function* addProjectWatcher() {
  yield takeEvery(CONSTANTS.ADD_PROJECT_REQUEST, addProject)
}
export function* deleteProjectWatcher() {
  yield takeEvery(CONSTANTS.DELETE_PROJECT_REQUEST, deleteProject)
}
export default function* selectedProjectsSaga() {
  yield all([
    fetchProjectsWatcher(),
    addProjectWatcher(),
    deleteProjectWatcher()
  ])
}
