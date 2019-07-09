/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import routes from 'shared/routes'
import './x-card.scss'
import {
  Card,
  Avatar,
  Col,
  Empty,
  Skeleton,
  Menu,
  Dropdown,
  Icon,
  Popconfirm,
} from 'antd'
import { FormattedMessage } from 'react-intl'
import { isContentArchitect } from 'shared/utils/access-token'
import messages from './messages'

const { Meta } = Card

const ProjectCard = ({ cards, projects, deleteProject, role }) => {
  const menu = id => (
    <Menu>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessage} />}
          onConfirm={() => deleteProject(id)}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      {projects.loading ? (
        Array.from({ length: 6 }).map(() => (
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Skeleton loading={projects.loading} active avatar />
          </Col>
        ))
      ) : (
        <div className="x-card">
          {isEmpty(cards) ? (
            <div className="no-members">
              <Empty />
            </div>
          ) : (
            cards.map((el, i) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={i}>
                <Link to={`${routes.PROJECT_DETAILS.linkPath(el.id)}`}>
                  <Card className="card-style">
                    <div className="card-container">
                      <div>
                        <Meta
                          id={el.id}
                          avatar={
                            <Avatar
                              shape="square"
                              size="large"
                              style={{
                                backgroundColor: `${el.backgroundColor}`,
                              }}
                            />
                          }
                          title={<span className="card-title">{el.name}</span>}
                          description={
                            <span className="card-description">
                              {el.description}
                            </span>
                          }
                        />
                      </div>
                      {isContentArchitect(role) && (
                        <div onClick={e => e.stopPropagation()}>
                          <Dropdown
                            overlay={menu(el.id)}
                            placement="bottomRight"
                            trigger={['click']}
                          >
                            <div>
                              <Icon type="dash" rotate={90} />
                            </div>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </div>
      )}
    </div>
  )
}

ProjectCard.propTypes = {
  cards: PropTypes.array,
  deleteProject: PropTypes.func,
  role: PropTypes.string.isRequired,
  projects: PropTypes.object.isRequired,
}

export default memo(ProjectCard)
