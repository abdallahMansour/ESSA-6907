/*
 * NodeModal Messages
 *
 * This contains all the text for the NodeModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.NodeModal'

export default defineMessages({
  Node: {
    id: `${scope}.Node`,
    defaultMessage: 'Add Student',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Student Email',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  nodeTitle: {
    id: `${scope}.nodeTitle`,
    defaultMessage: 'Student Name',
  },
  nodeType: {
    id: `${scope}.nodeType`,
    defaultMessage: 'skill',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Enrollment Number',
  },
  Picture: {
    id: `${scope}.Picture`,
    defaultMessage: 'Student picture',
  },
  nodeTitleError: {
    id: `${scope}.nodeTitleError`,
    defaultMessage: 'Please input the node title!',
  },
  nodeDescriptionError: {
    id: `${scope}.nodeDescriptionError`,
    defaultMessage: 'Please input the node description!',
  },
  nodeTypeError: {
    id: `${scope}.nodeTypeError`,
    defaultMessage: 'Please input the node type!',
  },
  lastNameError: {
    id: `${scope}.lastNameError`,
    defaultMessage: 'Please input the node type!',
  },
  PictureError: {
    id: `${scope}.Picture`,
    defaultMessage: 'Please input the node type!',
  },
})
