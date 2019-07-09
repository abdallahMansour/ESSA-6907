/**
 *
 * ConnectSuccess
 *
 */

import React from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'

import ConnectSuccess from './ConnectSuccess'

const ConnectSuccessIndex = props => {
  return <ConnectSuccess {...props} />
}

const mapDispatchToProps = {}

const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(withConnect)(ConnectSuccessIndex)
