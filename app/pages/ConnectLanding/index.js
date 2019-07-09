/**
 *
 * ConnectLanding
 *
 */

import React, { memo } from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectConnectLanding from '../../shared/redux/connectlanding/selectors'
import reducer from '../../shared/redux/connectlanding/reducer'

import * as actions from '../../shared/redux/connectlanding/actions'
import saga from '../../shared/redux/connectlanding/saga'
import ConnectLanding from './ConnectLanding'

const ConnectLandingIndex = props => {
  useInjectReducer({ key: 'connectLandingReducer', reducer })

  return <ConnectLanding {...props} />
}
console.log('wooooooooooooooloooooooooooolooooooooooloooooooooolo', actions)
const mapStateToProps = createStructuredSelector({
  connectLanding: makeSelectConnectLanding(),
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
)(ConnectLandingIndex)
