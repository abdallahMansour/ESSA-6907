/**
 *
 * ConnectEntreprise
 *
 */

import React from 'react'

import ConnectPartners from '../ConnectLanding/ConnectPartners'

import EntrepriseStart from '../ConnectLanding/EntrepriseStart'
import './connect-entreprise.scss'


class ConnectEntreprise extends React.Component {
  state = { step: 1, width: 20 }

  nextOne = () => {
    this.setState({
      step: this.state.step + 1,
      width: this.state.width + 20,
    })
  }

  prevOne = () => {
    this.setState({
      step: this.state.step - 1,
      width: this.state.width - 20,
    })
  }

  render() {
    return (
      <div >

              <EntrepriseStart />
  
    </div>
    )
  }
}
ConnectEntreprise.propTypes = {}

export default ConnectEntreprise
