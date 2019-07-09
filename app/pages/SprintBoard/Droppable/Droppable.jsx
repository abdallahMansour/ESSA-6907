/**
 *
 * Droppable
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  TASK_TYPE,
  BUG_TYPE,
  RESOLVED_STATE,
  DONE_STATE,
} from 'shared/constants'
import './droppable.scss'

function Droppable({ id, style, children, onUpdateWorkItemState }) {
  const drop = e => {
    e.preventDefault()
    const data = e.dataTransfer.getData('transfer')
    const type = e.dataTransfer.getData('type')

    if (
      !(id === RESOLVED_STATE.toString() && type === TASK_TYPE.toString()) &&
      !(id === DONE_STATE.toString() && type === BUG_TYPE.toString())
    ) {
      onUpdateWorkItemState(id, data)
    }
  }
  const allowDrop = e => {
    e.preventDefault()
  }
  return (
    <div
      id={id}
      onDrop={drop}
      onDragOver={allowDrop}
      style={style}
      className="droppable"
    >
      {children}
    </div>
  )
}

Droppable.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.any,
  children: PropTypes.any,
  onUpdateWorkItemState: PropTypes.func.isRequired,
}

export default memo(Droppable)
