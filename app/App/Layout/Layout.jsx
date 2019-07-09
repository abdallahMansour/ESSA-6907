/**
 *
 * Layout
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components.css'
import './globals.css'
import './custom.css'
// import './layout.scss'

const Layout = ({ children }) => <div className="la4yout">{children}</div>

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
