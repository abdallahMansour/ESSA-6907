/**
 *
 * ConnectDeveloper
 *
 */

import React from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'

import ConnectDeveloper from './ConnectDeveloper'

const ConnectDeveloperIndex = props => {
  return <ConnectDeveloper {...props} />
}

const mapDispatchToProps = {}

const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(withConnect)(ConnectDeveloperIndex)
