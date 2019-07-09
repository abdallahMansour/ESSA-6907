/**
 *
 * LiveShare
 *
 */

import React, {  useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import messages from './messages'
import * as Commands from '../../utils/liveshare-commands'
import { notification } from 'antd';
import * as CONSTANTS from './constants'


function LiveShare({createHubConnection, 
  collaboratorJoined, 
  collaboratorLeft, 
  applyPatch, 
  setChangeTracking, 
  receiveChatMessage, 
  addContentOperations, 
  nodeOperationReceived, 
  linkOperationReceived
}) {
  const skillSavedNotification = (collaborator) => {
    notification[CONSTANTS.NOTIFICATION_TYPE]({
      message: collaborator.fullName + " " + messages.skillSavedTitle.defaultMessage,
      description: messages.skillSavedMessage.defaultMessage,
      duration: 10
    });
  };
 
  useEffect(() => {
    createHubConnection((message) => {
      let messageObject = JSON.parse(message)
      switch(messageObject.command){
        case Commands.CollaboratorJoined:
          collaboratorJoined(messageObject.source)
          break
        case Commands.CollaboratorLeft:
          collaboratorLeft(messageObject.source)
          break
        case Commands.SkillUpdate:
          applyPatch(messageObject.origin, messageObject.patch)
          setChangeTracking(true)
          break
        case Commands.Chat:
              receiveChatMessage({message: messageObject.message, source: messageObject.source, date: messageObject.date, id: messageObject.id})
            break
        case Commands.ContentOperations:
              addContentOperations(messageObject.pageId, messageObject.operations)
            break
        case Commands.NodeUpdated: 
        case Commands.NodeCreated:   
        case Commands.NodeDeleted:
          nodeOperationReceived(messageObject.id, messageObject.name, messageObject.type, messageObject.command)
            break  
        case Commands.LinkUpdated: 
        case Commands.LinkCreated:   
        case Commands.LinkDeleted:
              linkOperationReceived(messageObject.sourceId, messageObject.targetId, messageObject.weight, messageObject.command)
            break 
        case Commands.InstanceSaved:
              skillSavedNotification(messageObject.source)
          break
      }
  })
  }, [])

  
  return (
    <div className="live-share">
    </div>
  )
}

LiveShare.propTypes = {
  createHubConnection: PropTypes.func, 
  collaboratorJoined: PropTypes.func, 
  collaboratorLeft: PropTypes.func, 
  applyPatch: PropTypes.func, 
  setChangeTracking: PropTypes.func, 
  receiveChatMessage: PropTypes.func, 
  addContentOperations: PropTypes.func, 
  nodeOperationReceived: PropTypes.func, 
  linkOperationReceived: PropTypes.func
}

export default LiveShare
