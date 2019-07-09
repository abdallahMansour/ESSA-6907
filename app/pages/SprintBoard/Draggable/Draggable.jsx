/**
 *
 * Draggable
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './draggable.scss'
function Draggable({ id, style, children, type, canDrag }) {
  const drag = e => {
    e.dataTransfer.setData('transfer', e.target.id)
    e.dataTransfer.setData('type', type)
  }
  const noAllowDrop = e => {
    e.stopPropagation()
  }
  return (
    <div
      id={id}
      draggable={canDrag}
      onDragStart={drag}
      onDragOver={noAllowDrop}
      style={style}
    >
      {children}
    </div>
  )
}

Draggable.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.any,
  children: PropTypes.any,
  type: PropTypes.number.isRequired,
}

export default memo(Draggable)
