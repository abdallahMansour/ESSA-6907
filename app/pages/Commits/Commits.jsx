/* eslint-disable react/no-array-index-key */
/**
 *
 * Commits
 *
 */

import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { isEmpty } from 'lodash'
import { Helmet } from 'react-helmet'
import {
  Typography,
  Row,
  Col,
  Timeline,
  List,
  Avatar,
  Skeleton,
  Tooltip,
  Icon,
} from 'antd'
import moment from 'moment'
import ColorHash from 'color-hash'
import Card from 'shared/components/Card'
import { groupByDate, orderByFullDate } from 'shared/utils/group-by'
import { COMMIT_PER_PAGE, DAY_MONTH_YEAR_DATE_FORMAT } from './constants'
import messages from './messages'
import './commits.scss'
const { Title } = Typography

const Commits = ({ fetchCommits, commits, revertToACommit, intl }) => {
  useEffect(() => {
    fetchCommits()
  }, [])

  const commitsData =
    commits.commits !== undefined ? groupByDate(commits.commits) : []

  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }

  function displayCommitIcon(dateIndex, commitIndex, item) {
    if (dateIndex === 0 && commitIndex === 0) {
      return null
    }
    return (
      <Icon
        className="commits-undo-icon"
        type="undo"
        onClick={() =>
          revertToACommit(
            item.id,
            `Revert back to ${item.id}`,
            `Revert back to ${item.id}`,
          )
        }
      />
    )
  }

  const colorHash = new ColorHash()
  return (
    <div className="commits">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>
      <Row>
        <Col>
          <Card title={<FormattedMessage {...messages.commits} />}>
            <Timeline>
              <Skeleton
                avatar
                title={false}
                loading={isEmpty(commitsData)}
                active
              >
                {Object.keys(commitsData).map((key, index) => (
                  <Timeline.Item color="#e6e6e6" key={index}>
                    <div className="time-line-title">
                      {moment(key).format('MMMM Do YYYY')}{' '}
                      <small>{moment(key).fromNow()}</small>
                    </div>
                    <List
                      pagination={{ pageSize: COMMIT_PER_PAGE }}
                      className="demo-loadmore-list"
                      loading={false}
                      itemLayout="horizontal"
                      dataSource={orderByFullDate(commitsData[key])}
                      renderItem={(item, itemIndexi) => (
                        <List.Item
                          actions={[displayCommitIcon(index, itemIndexi, item)]}
                        >
                          <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{
                                    backgroundColor: colorHash.hex(
                                      item.author.fullName,
                                    ),
                                  }}
                                >
                                  <span className="full-name-first-character">
                                    {item.author.fullName &&
                                      item.author.fullName[0].toUpperCase()}
                                  </span>
                                  {item.author.fullName &&
                                    item.author.fullName[
                                      item.author.fullName.indexOf(' ') + 1
                                    ].toUpperCase()}
                                </Avatar>
                              }
                              title={
                                <span className="list-item-title">
                                  <Tooltip title={item.message}>
                                    <span>{item.message}</span>
                                  </Tooltip>
                                </span>
                              }
                              description={
                                <span className="list-item-date">
                                  {item.hoursMinute}
                                  {moment(item.fullDate).format(
                                    DAY_MONTH_YEAR_DATE_FORMAT,
                                  ) ===
                                    moment().format(
                                      DAY_MONTH_YEAR_DATE_FORMAT,
                                    ) && (
                                    <small>
                                      {moment(item.fullDate).fromNow()}
                                    </small>
                                  )}
                                </span>
                              }
                            />
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                  </Timeline.Item>
                ))}
              </Skeleton>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Commits.propTypes = {
  commits: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCommits: PropTypes.func.isRequired,
  revertToACommit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Commits)
