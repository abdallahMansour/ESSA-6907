/**
 *
 * ConnectSuccess
 *
 */

import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types';

import './connect-success.scss'

const ConnectSuccess = ({company}) => (
  <div
    className="connect-success"
    style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}
  >
    <div
      className="u-shadow-v4 g-bg-white g-brd-around g-brd-gray-light-v4 g-line-height-2 g-pt-30 g-pl-30 g-pr-30 text-center successful-connect-reduce"
      role="alert"
      style={{ width: '80%' }}
    >
      <h3 className="h4 g-font-weight-700 g-mb-20 merci-connect-success">Merci!</h3>
      <p className="mb-3 connect-success-text">
        Nous avons bien reçu votre inscription. Notre expert CONNECT vous
        contactera dans les prochaines 48 heures ouvrables.
      </p>
      {
        company === 'true' ? ( <button className="apply_form-submit button text-uppercase g-font-size-10" onClick={() => window.open('https://gomycode.co/pour-les-entreprises', '_blank')}>
        Plus d'infos sur Connect
      </button>): ( <button className="apply_form-submit button text-uppercase g-font-size-10" onClick={() => window.open('https://gomycode.co/pour-les-developpeurs', '_blank')}>
        Plus d'infos sur Connect
      </button>)
      }
     
      <hr className="w-75 g-my-30 break-line-connect" />
      <a
        className="u-icon-v2 g-rounded-50x g-color-facebook g-color-facebook--hover g-mr-15 g-mb-20 u-icon-size--sm"
        onClick={()=>window.open('https://www.facebook.com/gomycode/?__tn__=%2Cd%2CP-R&eid=ARCWlT7nl6NtjREuXRG9VHIme3KI0oKJ5YdJnWEo5jL3pPgGmAOmto8FGLpKH4e5oZsibd4afGDX3SqJ', '_blank') }
        href='#'
      >
        <i className="fab fa-facebook" />
      </a>
      <a
        className="u-icon-v2 g-rounded-50x g-color-instagram g-color-instagram--hover g-mr-15 g-mb-20 u-icon-size--sm"
        onClick={()=>window.open('https://www.instagram.com/gomycode/', '_blank') }
        href='#'
      >
        <i className="fab fa-instagram" />
      </a>
      <a
        className="u-icon-v2 g-rounded-50x g-color-youtube g-color-youtube--hover g-mr-15 g-mb-20 u-icon-size--sm"
        onClick={()=>window.open('https://www.youtube.com/channel/UCB6_JaNT8ovPvRs-zxmcawQ', '_blank') }
        href='#'
      >
        <i className="fab fa-youtube" />
      </a>
      <a
        className="u-icon-v2 g-rounded-50x g-color-linkedin g-color-linkedin--hover g-mr-15 g-mb-20 u-icon-size--sm"
        onClick={()=>window.open('https://www.linkedin.com/school/go-my-code/', '_blank') }
        href='#'
      >
        <i className="fab fa-linkedin-in" />
      </a>
    </div>
  </div>
)

ConnectSuccess.propTypes = {}

export default ConnectSuccess
