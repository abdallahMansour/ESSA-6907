/**
 *
 * Landing
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './landing.scss'
import ConnectHeader from '../ConnectHeader'

function Landing() {
  return (
    <div className="developer-startt">
      <div className="layout-content">
        <ConnectHeader />
        <div className="layout-page">
          <div className="app_mount">
            <div>
              <h1 className="apply_form-header" style={{fontWeight: '700 !important', fontSize: '2.3rem !important'}}>
              Bienvenus sur CONNECT ! <br/>
Ici nous connectons entreprises et développeurs


              </h1>
              <h2 className="apply_form-subheader">
                Le réseau de développeurs de GoMyCode possède une large palette
                de compétences dans le monde tech et data.
              </h2>

              <div className="apply_form-actions">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
                    <Link
                      to="/developer"
                      className="apply_form-submit button has-chevron text-uppercase g-font-size-10 g-color-white--hover g-color-white"
                      style={{ textDecoration: 'none' }}
                    >
                      <span style={{fontSize:'12px'}}>
                      Rejoindre une entreprise
                      </span>
                    </Link>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <Link
                      to="/entreprise"
                      className="apply_form-submit  button has-chevron bg-dark text-uppercase g-font-size-10 g-color-white--hover g-color-white"
                      style={{ textDecoration: 'none' }}
                    >
                      <span style={{fontSize:'12px', marginLeft:'-5px'}}>
                      Trouver des développeurs
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Landing.propTypes = {}

export default Landing
