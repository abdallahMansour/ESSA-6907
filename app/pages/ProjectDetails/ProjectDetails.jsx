/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable global-require */
/**
 *
 * ProjectDetails
 *
 */

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import {
  FormattedMessage,
  FormattedDate,
  injectIntl,
  intlShape,
} from 'react-intl'
import Card from 'shared/components/Card'
import UserCard from 'shared/components/UserCard'
import routes from 'shared/routes'
import {
  Menu,
  Row,
  Col,
  Skeleton,
  Popconfirm,
  Empty,
  Input,
  Icon,
  PageHeader,
} from 'antd'
import CircularProgress from 'shared/components/CircularProgress'

import { unflattenArray } from 'shared/utils/array.helper'
import CreateProject from 'pages/Dashboard/CreateProject'
import { isContentArchitect } from 'shared/utils/access-token'
import messages from './messages'

import NumberStats from './NumberStats'
import AddMemberModal from './AddMemberModal'
import { getFilteredMembers } from './utils'
import './project-details.scss'

const NUMBER_IMAGES = [
  'detail-img1.png',
  'detail-img2.png',
  'detail-img3.png',
  'detail-img4.png',
]
const PostDate = injectIntl(({ date, intl }) => (
  <span title={intl.formatDate(date)}>
    <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
  </span>
))

const ProjectDetails = ({
  deleteMember,
  match: {
    params: { projectId },
  },
  fetchProjectById,
  fetchProjectStatsById,
  addMember,
  updateProject,
  selectedProject,
  role,
  intl,
}) => {
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false)
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [formRef, setFormRef] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [members, setMembers] = useState(
    selectedProject.data && selectedProject.data.members
      ? selectedProject.data.members
      : [],
  )

  useEffect(() => {
    fetchProjectById(projectId)
  }, [])

  useEffect(() => {
    setMembers(
      selectedProject.data && selectedProject.data.members
        ? getFilteredMembers(selectedProject.data.members, searchValue)
        : [],
    )
  }, [selectedProject, searchValue])

  const handleAddMember = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const member = {
        memberId: values.memberId,
        projectId,
      }
      addMember(member)
      handleAddMemberModalClose()
    })
  }
  const handleUpdateProject = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const project = {
        name: values.name,
        description: values.description,
        startDate: values.projectDates[0],
        dueDate: values.projectDates[1],
        members: selectedProject.data.members,
      }
      updateProject(projectId, project)
      handleUpdateProjectModalClose()
    })
  }

  const handleAddMemberModalClose = () => {
    setIsAddMemberModalVisible(false)
  }
  const handleUpdateProjectModalClose = () => {
    setIsUpdateModalVisible(false)
  }

  const myMenu = memberId => (
    <Menu>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessage} />}
          onConfirm={() => deleteMember(memberId)}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          <a href="#">{<FormattedMessage {...messages.delete} />}</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )
  const renderMembers = () => {
    const result = []
    if (isEmpty(members)) {
      return (
        <div className="no-members">
          <Empty />
        </div>
      )
    }
    unflattenArray(members, 2).forEach((rowMember, index) => {
      result.push(
        <Row key={index} gutter={24}>
          {rowMember.map(member => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              key={member.id}
              className="with-margin-bottom"
            >
              <div className="member-item">
                <UserCard
                  active={member.active}
                  title={`${member.fullName}`}
                  subTitle={member.role}
                  menu={myMenu(member.id)}
                  role={role}
                />
              </div>
            </Col>
          ))}
        </Row>,
      )
    })
    return result
  }
  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }
  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }
  return (
    <div className="project-details">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>
      <div className="project-title">
        {selectedProject.data && (
          <>
            <Row gutter={24} type="flex" className="row-title">
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Skeleton
                  loading={selectedProject.loading}
                  active
                  paragraph={false}
                >
                  <PageHeader
                    onBack={() => {
                      window.history.back()
                    }}
                    title={selectedProject.data.name}
                  />

                  {isContentArchitect(role) && (
                    <span className="project-icon">
                      <Icon
                        type="edit"
                        theme="filled"
                        onClick={() => setIsUpdateModalVisible(true)}
                      />
                    </span>
                  )}
                </Skeleton>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className="project-board">
                  <Link to={`${routes.SPRINT_BOARD.linkPath(projectId)}`}>
                    <span className="link">
                      <FormattedMessage {...messages.projectBoard} />
                    </span>
                    <Icon type="arrow-right" />
                  </Link>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>

      <Row gutter={24}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="with-margin-bottom"
        >
          <Card title={<FormattedMessage {...messages.projectTitle} />}>
            <Skeleton loading={selectedProject.loading} active>
              {selectedProject.data && (
                <div className="project-content">
                  <div className="period">
                    <FormattedMessage
                      {...messages.startDateEndDate}
                      values={{
                        startDate: (
                          <PostDate date={selectedProject.data.startDate} />
                        ),
                        dueDate: (
                          <PostDate date={selectedProject.data.dueDate} />
                        ),
                      }}
                    />
                  </div>
                  <FormattedMessage
                    {...messages.description}
                    values={{
                      description: selectedProject.data.description,
                    }}
                  />
                </div>
              )}
            </Skeleton>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="with-margin-bottom"
        >
          <Card
            title={<FormattedMessage {...messages.stats} />}
            extra={
              <Icon
                type="reload"
                onClick={() => fetchProjectStatsById(projectId)}
              />
            }
          >
            <Skeleton
              loading={selectedProject.loading || selectedProject.loadingStats}
              active
            >
              {selectedProject.data && selectedProject.data.stats && (
                <div className="stats-content">
                  <Row gutter={24}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <CircularProgress
                        percentage={
                          selectedProject.data.stats.estimatedProgress * 100
                        }
                        text={`${Number(
                          selectedProject.data.stats.estimatedProgress * 100,
                        ).toFixed(0)}%`}
                        title={
                          <FormattedMessage {...messages.estimatedProgress} />
                        }
                        pathColor="#f5a13e"
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <CircularProgress
                        percentage={selectedProject.data.stats.progress * 100}
                        text={`${Number(
                          selectedProject.data.stats.progress * 100,
                        ).toFixed(0)}%`}
                        title={<FormattedMessage {...messages.progress} />}
                        pathColor="#7ed327"
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </Skeleton>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="team-members with-margin-bottom"
        >
          <Card
            title={<FormattedMessage {...messages.teamMember} />}
            extra={
              <div className="team-members-extra">
                {isContentArchitect(role) && (
                  <span
                    className="add-member"
                    onClick={() => setIsAddMemberModalVisible(true)}
                  >
                    {<FormattedMessage {...messages.addNewMember} />}
                  </span>
                )}
                <Input.Search
                  placeholder=""
                  onChange={e => setSearchValue(e.target.value)}
                  style={{ width: 150 }}
                />
              </div>
            }
            className="team-members-content"
          >
            <Skeleton loading={selectedProject.loading} avatar active>
              {selectedProject.data && <div>{renderMembers()}</div>}
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card title={<FormattedMessage {...messages.numbers} />}>
            <Skeleton
              loading={selectedProject.loading || selectedProject.loadingStats}
              active
            >
              {selectedProject.data && selectedProject.data.stats && (
                <>
                  <Row gutter={24} className="numbers-items">
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="numbers-item detail with-margin-bottom"
                    >
                      <NumberStats
                        image={require(`../../assets/icons/${
                          NUMBER_IMAGES[0]
                        }`)}
                        number={selectedProject.data.stats.numberOfTasks.toString()}
                        text={<FormattedMessage {...messages.numberOfTasks} />}
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="numbers-item detail with-margin-bottom"
                    >
                      <NumberStats
                        image={require(`../../assets/icons/${
                          NUMBER_IMAGES[1]
                        }`)}
                        number={selectedProject.data.stats.numberOfCompletedTasks.toString()}
                        text={<FormattedMessage {...messages.completedTasks} />}
                      />
                    </Col>
                  </Row>
                  <Row gutter={24} className="numbers-items">
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="numbers-item detail with-margin-bottom"
                    >
                      <NumberStats
                        image={require(`../../assets/icons/${
                          NUMBER_IMAGES[2]
                        }`)}
                        number={moment(selectedProject.data.dueDate)
                          .diff(selectedProject.data.startDate, 'days')
                          .toString()}
                        text={
                          <FormattedMessage {...messages.nbOfRemainingDays} />
                        }
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="numbers-item detail with-margin-bottom"
                    >
                      <NumberStats
                        image={require(`../../assets/icons/${
                          NUMBER_IMAGES[3]
                        }`)}
                        number={Number(
                          selectedProject.data.stats.efficiency,
                        ).toFixed(2)}
                        text={<FormattedMessage {...messages.efficiency} />}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Skeleton>
          </Card>
        </Col>
      </Row>
      {isAddMemberModalVisible && (
        <AddMemberModal
          wrappedComponentRef={saveFormRef}
          isVisible={isAddMemberModalVisible}
          handleCancel={handleAddMemberModalClose}
          handleOk={handleAddMember}
          membersIds={members.map(member => member.memberId)}
          fetch
        />
      )}
      {isUpdateModalVisible && (
        <CreateProject
          wrappedComponentRef={saveFormRef}
          project={selectedProject.data}
          isVisible={isUpdateModalVisible}
          handleCancel={handleUpdateProjectModalClose}
          handleOk={handleUpdateProject}
        />
      )}
    </div>
  )
}
ProjectDetails.propTypes = {
  selectedProject: PropTypes.object.isRequired,
  deleteMember: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetchProjectById: PropTypes.func.isRequired,
  fetchProjectStatsById: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(ProjectDetails)
