import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { getData, getChangeTracking } from '../../redux/editor/selectors'
import { getConnection, getConnected } from '../../redux/liveshare/selectors'
import LiveShareChangeTracker from './LiveShareChangeTracker'
import * as actions from '../../redux/liveshare/actions'
import saga from '../../redux/liveshare/saga'

import reducer from '../../redux/liveshare/reducer'
import editorReducer from '../../redux/editor/reducer'

const LiveShareChangeTrackerIndex = props => {
  useInjectReducer({ key: 'liveshare', reducer })
  useInjectReducer({ key: 'editor', reducer: editorReducer })
  return <LiveShareChangeTracker {...props} />
}

const mapStateToProps = createStructuredSelector({
  connection: getConnection(),
  data: getData(),
  trackChanges: getChangeTracking(),
  isConnected: getConnected(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'liveshare', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(LiveShareChangeTrackerIndex)
