/**
 *
 * ConnectPartners
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';

import './connect-partners.scss'

function ConnectPartners() {
  return (
    <div className="connect-partners">
      <div className="layout-sidebar">
        <div className="layout-sidebar-content">
          <div className="app_mount-regular_trust slideshow-wrap">
            <div className="slideshow">
              <div className="trust_logos">
                <h3 className="trust_logos-header" style={{ fontSize: '28px' }}>
                  Nos partenaires
                </h3>
                <div className="trust_logos-clients" style={{ opacity: '0.3' }}>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/ats.png')}
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/fis.png')}
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/geomap-imagis.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/linedata.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/oyez.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/sopra.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/talan.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/target.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/sofrecom.png')}
                      alt="partner"
                    />
                  </div>
                  <div className="trust_logos-client_logo">
                    <img
                      src={require('../../../App/Layout/img/logo/vermeg.png')}
                      alt="partner"
                    />
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

ConnectPartners.propTypes = {}

export default ConnectPartners
