/**
 *
 * LiveShareChangeTracker
 *
 */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPreviousProps } from '../../utils/hooks'
import { differentiate } from '../../utils/patch-manager'

function LiveShareChangeTracker({
  isConnected,
  data,
  sendPatch,
  connection,
  skillId,
  trackChanges,
}) {
  const jsonCopy = src => JSON.parse(JSON.stringify(src))
  const prevData = getPreviousProps(data)
  const makeContentNull = parsedData => {
    const dataCopy = parsedData
    if (
      dataCopy.learningStyles !== null &&
      dataCopy.learningStyles.length > 0
    ) {
      dataCopy.learningStyles.forEach(ls => {
        if (
          dataCopy[ls] !== null &&
          dataCopy[ls].pages !== null &&
          dataCopy[ls].pages.length > 0
        )
          dataCopy[ls].pages.forEach(pageId => {
            dataCopy[pageId].content = ''
          })
      })
    }
    return dataCopy
  }

  useEffect(() => {
    if (prevData !== undefined && prevData !== null && trackChanges) {
      const diff = differentiate(
        makeContentNull(jsonCopy(prevData)),
        makeContentNull(jsonCopy(data)),
      )
      if (diff !== undefined && diff != null && diff.length > 0 && isConnected)
        sendPatch(
          connection,
          skillId,
          diff,
          JSON.stringify(makeContentNull(jsonCopy(prevData))),
        )
    }
  }, [data])
  return <div />
}

LiveShareChangeTracker.propTypes = {
  isConnected: PropTypes.bool,
  data: PropTypes.object,
  sendPatch: PropTypes.func,
  connection: PropTypes.object,
  skillId: PropTypes.string,
  trackChanges: PropTypes.bool,
}

export default LiveShareChangeTracker
