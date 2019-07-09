/*
 *
 * Issues actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchIssues() {
  return {
    type: CONSTANTS.FETCH_ISSUES_REQUEST,
  }
}

export function updateStatus(issueId, issue) {
  return {
    type: CONSTANTS.UPDATE_STATUS_REQUEST,
    issueId,
    issue,
  }
}
