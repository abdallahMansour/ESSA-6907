/**
 *
 * EntrepriseEmbauche
 *
 */

import React from 'react'
import { Radio, Input } from 'antd'
// import PropTypes from 'prop-types';

import './entreprise-embauche.scss'

class EntrepriseEmbauche extends React.Component {
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
      <div className="entreprise-embauche">
        <div className="step">
          <div className="step-header">
            Quel est le moment dans lequel vous aimeriez embaucher votre futur
            développeur ?
          </div>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Immédiatement
            </Radio>
            <Radio style={radioStyle} value={2}>
              1 à 2 semaines
            </Radio>
            <Radio style={radioStyle} value={3}>
              Plus de 2 semaines
            </Radio>
            <Radio style={radioStyle} value={4}>
              Pas de date fixe
            </Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

EntrepriseEmbauche.propTypes = {}

export default EntrepriseEmbauche
