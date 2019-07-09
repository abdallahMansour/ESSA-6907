/**
 *
 * Developertechnology
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Input } from 'antd'
import './developertechnology.scss'

function Developertechnology() {
  return (
    <div className="developertechnology">
      <div className="step">
        <div className="step-header">
          Quelles sont les technologies que vous maitrisez ou vous avez déjà
          maitrisé auparavant ?
        </div>
        <Input placeholder="Technologies souhaitées (ex., React, Javascripts, jQuery, etc)" />
      </div>
    </div>
  )
}

Developertechnology.propTypes = {}

export default Developertechnology
