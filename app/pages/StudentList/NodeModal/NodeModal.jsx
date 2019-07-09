/**
 *
 * NodeModal
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Radio } from 'antd'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import './node-modal.scss'
const { TextArea } = Input
class NodeModal extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    form: PropTypes.any,
    disabled: PropTypes.bool.isRequired,
  }

  state = {
    canUpload: true,
  }

  // @review: e ?
  normFile = modal => {
    this.setState({ canUpload: modal.fileList.length === 0 })
    if (Array.isArray(modal)) {
      return modal
    }
    return modal && modal.fileList
  }

  render() {
    const {
      isVisible,
      handleCancel,
      handleOk,
      form: { getFieldDecorator },
    } = this.props
    const { canUpload } = this.state

    return (
      <Modal
        visible={isVisible}
        title={<FormattedMessage {...messages.Node} />}
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
        <Form
          layout="vertical"
          onKeyPress={e => {
            e.key === 'Enter' ? handleOk() : ''
          }}
        >
          <Form.Item label={<FormattedMessage {...messages.nodeTitle} />}>
            {getFieldDecorator('nodeTitle', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.nodeTitleError} />,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<FormattedMessage {...messages.lastName} />}>
            {getFieldDecorator('lastName', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.lastNameError} />,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<FormattedMessage {...messages.Picture} />}>
            {getFieldDecorator('Picture', {
              rules: [
                {
                  required: true,
                  message: <FormattedMessage {...messages.PictureError} />,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<FormattedMessage {...messages.description} />}>
            {getFieldDecorator('nodeDescription', {
              rules: [
                {
                  required: true,
                  message: (
                    <FormattedMessage {...messages.nodeDescriptionError} />
                  ),
                },
              ],
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default memo(NodeModal)
