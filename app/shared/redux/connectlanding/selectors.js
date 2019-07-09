import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the connect state domain
 */

const selectConnectLandingDomain = state => state.connect || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Connect
 */

const makeSelectConnect = () =>
  createSelector(
    selectConnectLandingDomain,
    substate => substate,
  )

export default makeSelectConnect
export { selectConnectLandingDomain }
