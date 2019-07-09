import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import * as api from 'shared/services/sprint.service'
import moment from 'moment'
import { FETCH_PROJECT_BY_ID_REQUEST } from 'shared/redux/selectedproject/constants'
import { NOTIFICATION_TYPES } from 'shared/constants'
import { pushNotification } from 'shared/utils/notification'
import { errorsExtraction } from 'shared/utils/error-interceptors'
import * as CONSTANTS from './constants'
const delay = ms => new Promise(res => setTimeout(res, ms))

// Individual exports for testing
export function* fetchSprintsFirstTime(action) {
  try {
    yield put({
      type: FETCH_PROJECT_BY_ID_REQUEST,
      projectId: action.projectId,
    })
    const data = yield call(api.fetchSprints, action.projectId)

    yield put({
      type: CONSTANTS.FETCH_SPRINTS_FIRST_TIME_SUCCESS,
      sprints: data.model,
    })
    let selectedSprintId
    if (data.model.length) {
      const now = moment().format()
      const pos = data.model.findIndex(
        sprint => sprint.startDate <= now && sprint.dueDate >= now,
      )
      if (pos !== -1) {
        selectedSprintId = data.model[pos].id
      } else {
        selectedSprintId = data.model[data.model.length - 1].id
      }
      yield put({
        type: CONSTANTS.FETCH_WORK_ITEMS_REQUEST,
        sprintId: selectedSprintId,
      })
    }
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_SPRINTS_FIRST_TIME_FAILURE })
  }
}

export function* fetchSprints(action) {
  try {
    const data = yield call(api.fetchSprints, action.projectId)
    yield put({
      type: CONSTANTS.FETCH_SPRINTS_SUCCESS,
      sprints: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_SPRINTS_FAILURE })
  }
}

export function* addSprint(action) {
  try {
    const data = yield call(api.addSprint, action.sprint)
    yield put({
      type: CONSTANTS.ADD_SPRINT_SUCCESS,
      sprint: data.model,
    })
  } catch (e) {
    const errors = errorsExtraction(e.response.data.model)
    errors.forEach(error => pushNotification(NOTIFICATION_TYPES.error, error))

    yield put({ type: CONSTANTS.ADD_SPRINT_FAILURE, errors })
  }
}

export function* fetchWorkItems(action) {
  try {
    const data = yield call(api.fetchWorkItems, action.sprintId)

    yield put({
      type: CONSTANTS.FETCH_WORK_ITEMS_SUCCESS,
      sprintId: action.sprintId,
      workItems: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_WORK_ITEMS_FAILURE })
  }
}
export function* addWorkItem(action) {
  try {
    const data = yield call(api.addWorkItem, action.workItem)
    yield delay(1000)
    yield put({
      type: CONSTANTS.ADD_WORK_ITEM_SUCCESS,
      sprintId: action.workItem.sprintId,
      workItem: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.ADD_WORK_ITEM_FAILURE })
  }
}

export function* updateWorkItem(action) {
  try {
    const data = yield call(
      api.updateWorkItem,
      action.workItemId,
      action.workItem,
    )
    yield put({
      type: CONSTANTS.UPDATE_WORK_ITEM_SUCCESS,
      workItemId: action.workItemId,
      oldSprintId: action.oldSprintId,
      workItem: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.UPDATE_WORK_ITEM_FAILURE })
  }
}

export function* updateWorkItemState(action) {
  try {
    const data = yield call(
      api.updateWorkItemState,
      action.workItemId,
      action.workItem,
    )
    yield put({
      type: CONSTANTS.UPDATE_WORK_ITEM_STATE_SUCCESS,
      workItemId: action.workItemId,
      sprintId: action.sprintId,
      workItem: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.UPDATE_WORK_ITEM_STATE_FAILURE })
  }
}

export function* deleteWorkItem(action) {
  try {
    yield call(api.deleteWorkItem, action.workItemId)
    yield put({
      type: CONSTANTS.DELETE_WORK_ITEM_SUCCESS,
      sprintId: action.sprintId,
      workItemId: action.workItemId,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.DELETE_WORK_ITEM_FAILURE })
  }
}
export function* fetchSprintsFirstTimeWatcher() {
  yield takeEvery(
    CONSTANTS.FETCH_SPRINTS_FIRST_TIME_REQUEST,
    fetchSprintsFirstTime,
  )
}
export function* fetchSprintsWatcher() {
  yield takeEvery(CONSTANTS.FETCH_SPRINTS_REQUEST, fetchSprints)
}
export function* addSprintWatcher() {
  yield takeEvery(CONSTANTS.ADD_SPRINT_REQUEST, addSprint)
}

export function* fetchWorkItemsWatcher() {
  // yield take(FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_SUCCESS)
  yield takeEvery(CONSTANTS.FETCH_WORK_ITEMS_REQUEST, fetchWorkItems)
}
export function* addWorkItemWatcher() {
  yield takeEvery(CONSTANTS.ADD_WORK_ITEM_REQUEST, addWorkItem)
}

export function* updateWorkItemWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_WORK_ITEM_REQUEST, updateWorkItem)
}

export function* deleteWorkItemWatcher() {
  yield takeEvery(CONSTANTS.DELETE_WORK_ITEM_REQUEST, deleteWorkItem)
}

export function* updateWorkItemStateWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_WORK_ITEM_STATE_REQUEST, updateWorkItemState)
}

export default function* sprintsSaga() {
  yield all([
    fetchSprintsFirstTimeWatcher(),
    addSprintWatcher(),
    fetchSprintsWatcher(),
    fetchWorkItemsWatcher(),
    addWorkItemWatcher(),
    updateWorkItemWatcher(),
    deleteWorkItemWatcher(),
    updateWorkItemStateWatcher(),
  ])
}
