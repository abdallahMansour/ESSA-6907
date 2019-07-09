/*
 * SprintModal Messages
 *
 * This contains all the text for the SprintModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SprintModal'

export default defineMessages({
  createSprint: {
    id: `${scope}.addSprint`,
    defaultMessage: 'Create Sprint',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'name',
  },

  startDate: {
    id: `${scope}.startDate`,
    defaultMessage: 'Start Date',
  },
  dueDate: {
    id: `${scope}.dueDate`,
    defaultMessage: 'Due Date',
  },
  nameError: {
    id: `${scope}.name`,
    defaultMessage: 'Please input the name',
  },

  sprintDates: {
    id: `${scope}.sprintDates`,
    defaultMessage: 'Start Date and Due Date',
  },
  sprintDatesError: {
    id: `${scope}.sprintDatesError`,
    defaultMessage: 'Please input your start date and the due date!',
  },
})
