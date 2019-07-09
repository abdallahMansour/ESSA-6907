/**
 *
 * Stepper
 *
 */

import React from 'react'
import { Steps } from 'antd'
// import PropTypes from 'prop-types';

import './stepper.scss'
const { Step } = Steps
function Stepper() {
  return (
    <div className="stepper">
      <Steps current={0}>
        <Step />
        <Step />
        <Step />
      </Steps>
    </div>
  )
}

Stepper.propTypes = {}

export default Stepper
