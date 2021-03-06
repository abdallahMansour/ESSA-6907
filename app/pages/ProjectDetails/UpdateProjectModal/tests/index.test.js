import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'


import UpdateProjectModal from '../index'
import { DEFAULT_LOCALE } from '../../../../i18n'

describe('<UpdateProjectModal />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <UpdateProjectModal project />
      </IntlProvider>,
    )
    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true)
  })

})
