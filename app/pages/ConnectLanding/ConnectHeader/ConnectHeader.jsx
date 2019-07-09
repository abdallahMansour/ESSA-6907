/**
 *
 * ConnectHeader
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';

import './connect-header.scss'

function ConnectHeader() {
  return (
    <div className="connect-header">
      <div className="d-flex justify-content-center">
        <img
          src="data:image/png;base64,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"
          alt="GMC"
          className="img-fluid g-height-40 g-mb-50"
        />
      </div>
    </div>
  )
}

ConnectHeader.propTypes = {}

export default ConnectHeader