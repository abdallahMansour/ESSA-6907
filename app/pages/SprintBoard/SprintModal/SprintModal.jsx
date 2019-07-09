/* eslint-disable react/prefer-stateless-function */
/**
 *
 * SprintModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, DatePicker } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './sprint-modal.scss'

const { RangePicker } = DatePicker
class SprintModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
    startDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      form: { getFieldDecorator },
    } = this.props

    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.createSprint} />}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {<FormattedMessage {...messages.cancel} />}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {<FormattedMessage {...messages.validate} />}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label={<FormattedMessage {...messages.sprintDates} />}>
            {getFieldDecorator('sprintDates', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.sprintDatesError} />,
                },
              ],
            })(
              <RangePicker
                disabledDate={current =>
                  current && current <= moment().endOf('day')
                }
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(SprintModal)
