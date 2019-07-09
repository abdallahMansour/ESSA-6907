/**
 *
 * Tests for CreateProject
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
//import 'jest-dom/extend-expect'; // add some helpful assertions

import CreateProject from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<CreateProject />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CreateProject />
      </IntlProvider>,
    )
    expect(spy).not.toHaveBeenCalled()
  })
})
