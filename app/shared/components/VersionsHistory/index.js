import React, { memo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import injectSaga from 'utils/injectSaga'
import { DAEMON } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectCommits from '../../redux/commits/selectors'
import reducer from '../../redux/commits/reducer'
import * as actions from '../../redux/commits/actions'
import saga from '../../redux/commits/saga'
import VersionsHistory from './VersionsHistory'

const VersionHistorySideBar = props => {
  useInjectReducer({ key: 'commits', reducer })
  return <VersionsHistory {...props} />
}

const mapStateToProps = createStructuredSelector({
  commits: makeSelectCommits(),
})

const mapDispatchToProps = {
  ...actions,
}

const withSaga = injectSaga({ key: 'commits', saga, mode: DAEMON })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
  withSaga,
)(VersionHistorySideBar)

