/*
 * CreateProject Messages
 *
 * This contains all the text for the CreateProject component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.CreateProject'

export default defineMessages({
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'Create/Update Project',
  },
  projectName: {
    id: `${scope}.projectName`,
    defaultMessage: 'Project Name',
  },
  projectNameError: {
    id: `${scope}.ProjectNameError`,
    defaultMessage: 'Please input your name!',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  descriptionError: {
    id: `${scope}.descriptionError`,
    defaultMessage: 'Please input your description!',
  },
  projectDates: {
    id: `${scope}.projectDates`,
    defaultMessage: 'Start Date and Due Date',
  },
  projectDatesError: {
    id: `${scope}.projectDatesError`,
    defaultMessage: 'Please input your start date and the due date!',
  },
})
