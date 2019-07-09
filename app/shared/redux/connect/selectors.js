import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the connect state domain
 */

const selectConnectDomain = state => state.connect || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Connect
 */

const makeSelectConnect = () =>
  createSelector(
    selectConnectDomain,
    substate => substate,
  )

export default makeSelectConnect
export { selectConnectDomain }
