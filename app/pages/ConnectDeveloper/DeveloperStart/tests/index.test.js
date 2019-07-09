/**
 *
 * Tests for DeveloperStart
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
// import 'jest-dom/extend-expect'; // add some helpful assertions

import DeveloperStart from '../index'

describe('<DeveloperStart />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<DeveloperStart />)
    expect(spy).not.toHaveBeenCalled()
  })

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<DeveloperStart />)
    expect(firstChild).toMatchSnapshot()
  })
})
