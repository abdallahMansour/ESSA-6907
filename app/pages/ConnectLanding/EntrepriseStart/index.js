
/**
 *
 * EntrepriseStart
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'

import makeSelectConnect from 'shared/redux/connectlanding/selectors'
import reducer from 'shared/redux/connectlanding/reducer'
import * as actions from 'shared/redux/connectlanding/actions'
import saga from 'shared/redux/connectlanding/saga'

import EntrepriseStart from './EntrepriseStart'

const EntrepriseStartIndex = props => {
  useInjectReducer({ key: 'connectLandingReducer', reducer })

  return <EntrepriseStart {...props} />
}

const mapStateToProps = createStructuredSelector({
  connect: makeSelectConnect(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({
  key: 'connectLandingReducer',
  saga,
  mode: DAEMON,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(EntrepriseStartIndex)
