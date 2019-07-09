/**
 *
 * DeveloperDuration
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Radio, Input } from 'antd'
import './developer-duration.scss'

class DeveloperDuration extends React.Component {
  state = {
    value: 0,
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
      <div className="developer-duration">
        <div className="step">
          <div className="step-header">
            Combien de temps avez vous travaillé en tant que développeur en
            total ?
          </div>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Jamais
            </Radio>
            <Radio style={radioStyle} value={2}>
              Moins d'un an
            </Radio>
            <Radio style={radioStyle} value={3}>
              De 1 à 3 ans
            </Radio>
            <Radio style={radioStyle} value={4}>
              De 3 à 5 ans
            </Radio>
            <Radio style={radioStyle} value={5}>
              Plus de 5 ans
            </Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

DeveloperDuration.propTypes = {}

export default DeveloperDuration
