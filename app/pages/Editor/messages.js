/*
 * Editor Messages
 *
 * This contains all the text for the Editor container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Editor'

export default defineMessages({
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close ',
  },
  confirmMessagePage: {
    id: `${scope}.confirmMessagePage`,
    defaultMessage: 'Are you sure to delete this page?',
  },
  confirmMessageClose: {
    id: `${scope}.confirmMessageClose`,
    defaultMessage: 'You updated the skill. Are you sure to close the editor?',
  },

  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  connected: {
    id: `${scope}.connected`,
    defaultMessage: 'Connected',
  },
  connecting: {
    id: `${scope}.connecting`,
    defaultMessage: 'Connecting',
  },
  disconnected: {
    id: `${scope}.disconnected`,
    defaultMessage: 'Disconnected',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Description of Editor',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Editor',
  },
  assessment: {
    id: `${scope}.assessment`,
    defaultMessage: 'Assessment',
  },
  warning: {
    id: `${scope}.warning`,
    defaultMessage: 'Warning',
  },
})
