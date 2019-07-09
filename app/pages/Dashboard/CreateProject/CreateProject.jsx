import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Button, Modal, Form, DatePicker, Input } from 'antd'
import messages from './messages'
import './create-card.scss'

const { RangePicker } = DatePicker

class CreateProject extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    project: PropTypes.object,
    form: PropTypes.any,
  }

  state = {}

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      project,
      form: { getFieldDecorator },
    } = this.props
    return (
      <div className="create-card">
        <Modal
          title={<FormattedMessage {...messages.project} />}
          visible={isVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              <FormattedMessage {...messages.cancel} />
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              {<FormattedMessage {...messages.validate} />}
            </Button>,
          ]}
        >
          <Form layout="vertical" onKeyPress={(e) => { e.key === "Enter" ? handleOk() : '' }}>
            <Form.Item label={<FormattedMessage {...messages.projectName} />}>
              {getFieldDecorator('name', {
                initialValue: project ? project.name : '',
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.projectNameError} />
                    ),
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<FormattedMessage {...messages.description} />}>
              {getFieldDecorator('description', {
                initialValue: project ? project.description : '',
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.descriptionError} />
                    ),
                  },
                ],
              })(<Input.TextArea autosize={{ minRows: '6', maxRows: '6' }} />)}
            </Form.Item>
            <Form.Item label={<FormattedMessage {...messages.projectDates} />}>
              {getFieldDecorator('projectDates', {
                initialValue: project
                  ? [moment(project.startDate), moment(project.dueDate)]
                  : '',
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.projectDatesError} />
                    ),
                  },
                ],
              })(
                <RangePicker
                  disabledDate={current =>
                    current && current < moment().endOf('day')
                  }
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default memo(CreateProject)
