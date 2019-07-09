import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the selectedProject state domain
 */

export const selectSelectedProjectDomain = state =>
  state.selectedProject || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by SelectedProject
 */

const makeSelectSelectedProject = () =>
  createSelector(
    selectSelectedProjectDomain,
    substate => substate,
  )

export default makeSelectSelectedProject
// export { selectSelectedProjectDomain }
