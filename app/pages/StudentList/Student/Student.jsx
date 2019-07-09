/**
 *
 * Student
 *
 */

import React, { memo, useState } from 'react'
import { Card, Icon, Avatar, Tag } from 'antd'
// import PropTypes from 'prop-types';

import './student.scss'
const { Meta } = Card
const { CheckableTag } = Tag
function Student({ name, email, enrollment, deleteFunc }) {
  const [checkTag, setcheckTag] = useState(true)
  const handleChange = checked => {
    setcheckTag(checked)
  }
  return (
    <div className="student">
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Icon type="delete" onClick={deleteFunc} />,
          <Icon type="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={
            <div>
              {name}
              <div>{email}</div>
            </div>
          }
          description={enrollment}
        />
        <CheckableTag checked={checkTag} onChange={handleChange}>
          {' '}
          {checkTag == true ? (
            <span>present</span>
          ) : (
            <span>not present</span>
          )}{' '}
        </CheckableTag>
      </Card>
      {/* <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta
          title={
            <div>
              {name}
              <div>{email}</div>
            </div>
          }
          description={enrollment}
        />
      </Card> */}
    </div>
  )
}

Student.propTypes = {}

export default memo(Student)
