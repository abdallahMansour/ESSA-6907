/**
 *
 * Tests for Student
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Student from '../index'

describe('<Student />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<Student />)
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
    } = render(<Student />)
    expect(firstChild).toMatchSnapshot()
  })
})
