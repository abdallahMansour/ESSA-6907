/**
 *
 * ConnectEntreprise
 *
 */

import React from 'react'
import { connect } from 'react-redux'

import { compose } from 'redux'

import ConnectEntreprise from './ConnectEntreprise'

const ConnectEntrepriseIndex = props => {
  return <ConnectEntreprise {...props} />
}

const mapDispatchToProps = {}

const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(withConnect)(ConnectEntrepriseIndex)
