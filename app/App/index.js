/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectConnectLanding from 'shared/redux/connectlanding/selectors'
// import reducer from 'shared/redux/profile/reducer'
import reducer from 'shared/redux/connectlanding/reducer'
import * as actions from 'shared/redux/profile/actions'
import saga from 'shared/redux/profile/saga'
import { X_IDENTITY_URL } from 'shared/constants'
import FourOfFour from 'pages/FourOfFour'
import {
  getLocation,
  getTechnologies,
} from 'shared/redux/connectlanding/actions'
import {
  setAccessTokenIfDefined,
  getRole,
  isContentArchitect,
} from '../shared/utils/access-token'
import Layout from './Layout'
import routes from '../shared/routes'
import { registerPushNotification } from '../shared/utils/onesignal'
import './global-styles.scss'
import ConnectLanding from 'pages/ConnectLanding'

function App({ setRole, role }) {
  useInjectReducer({ key: 'connectLandingReducer', reducer })

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     window.location = `${X_IDENTITY_URL}?redirectUrl=${window.location.href}`
  //   }
  // })
  // useEffect(() => {
  //   const roleFromToken = getRole()
  //   setRole(roleFromToken)
  // })
  // setAccessTokenIfDefined()
  // registerPushNotification()
  useEffect(() => {
    getLocation()
    getTechnologies('az')
  })
  return (
    <div>
      <Layout>
        <Switch>
          <Route
            exact
            path={routes.ROOT.path}
            render={() => <Redirect to={routes.CONNECT.path} />}
          />

          <Route
            path={routes.CONNECT.path}
            render={props => <routes.CONNECT.component />}
          />
          <Route
            path={routes.ENTREPRISE.path}
            render={props => <routes.ENTREPRISE.component />}
          />
          <Route
            path={routes.DEVELOPER.path}
            render={props => <routes.DEVELOPER.component />}
          />
          <Route
            path={routes.STUDENTS.path}
            render={prop => <routes.STUDENTS.component />}
          />
          <Route component={FourOfFour} />
          {/* <Route
            path={routes.STUDENTS.path}
            render={prop => <routes.STUDENTS.component />}
          /> */}
        </Switch>
      </Layout>
    </div>
  )
}
App.propTypes = {
  role: PropTypes.string,
  setRole: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  connectLanding: makeSelectConnectLanding(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({
  key: 'connectLandingReducer',
  saga,
  mode: DAEMON,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(App)
