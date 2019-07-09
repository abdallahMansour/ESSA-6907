import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('setRole action', () => {
  it('has a type of SET_ROLE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.SET_ROLE_REQUEST,
    }
    expect(ACTIONS.setRole()).toEqual(expected)
  })
})