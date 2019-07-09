/**
 *
 * DeveloperType
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Radio, Input } from 'antd'
import './developer-type.scss'

class DeveloperType extends React.Component {
  state = {
    value: 1,
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    return (
      <div className="developer-type">
        <div className="step">
          <div className="step-header">
            Quel type de développeur êtes-vous ?
          </div>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Développeur Front-End
            </Radio>
            <Radio style={radioStyle} value={2}>
              Développeur Back-End
            </Radio>
            <Radio style={radioStyle} value={3}>
              Développeur Fullstack
            </Radio>
            <Radio style={radioStyle} value={4}>
              Data Scientist
            </Radio>
            <Radio style={radioStyle} value={5}>
              Ingénieur DevOps
            </Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

DeveloperType.propTypes = {}

export default DeveloperType
