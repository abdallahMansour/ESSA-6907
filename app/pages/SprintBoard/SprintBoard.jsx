/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * SprintBoard
 *
 */

import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Popconfirm,
  Menu,
  Badge,
  Row,
  Col,
  Select,
  PageHeader,
  Divider,
  Icon,
  Spin,
  Alert,
} from 'antd'

import {
  FormattedDate,
  injectIntl,
  FormattedMessage,
  intlShape,
} from 'react-intl'
import { Helmet } from 'react-helmet'
import { isEmpty } from 'lodash'
import {
  TODO_STATE,
  RESOLVED_STATE,
  ACTIVE_STATE,
  DONE_STATE,
  TASK_TYPE,
  BUG_TYPE,
  EMPTY_VALUE,
  YEAR_MONTH_DAY_DATE_FORMAT,
} from 'shared/constants'
import { isContentArchitect } from 'shared/utils/access-token'

import messages from './messages'
import WorkItem from './WorkItem'
import Droppable from './Droppable'
import Draggable from './Draggable'

import WorkItemModal from './WorkItemModal'
import SprintModal from './SprintModal'
import AddWorkItem from './AddWorkItem'

import './sprint-board.scss'

const PostDate = injectIntl(({ date, intl }) => (
  <span title={intl.formatDate(date)}>
    <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
  </span>
))

const SprintBoard = ({
  selectedSprintId,
  sprints,
  selectedProject,
  fetchSprintsFirstTime,
  updateWorkItemState,
  deleteWorkItem,
  fetchWorkItems,
  addWorkItem,
  updateWorkItem,
  addSprint,
  match: {
    params: { projectId },
  },
  intl,
  role,
  errors,
}) => {
  const [todoList, setTodoList] = useState([])
  const [activeList, setActiveList] = useState([])
  const [resolvedList, setResolvedList] = useState([])
  const [doneList, setDoneList] = useState([])
  const [isAddWorkItemModalVisible, setIsAddWorkItemModalVisible] = useState(
    false,
  )
  const [
    isUpdateWorkItemModalVisible,
    setIsUpdateWorkItemModalVisible,
  ] = useState(false)
  const [isAddSprintModalVisible, setIsAddSprintModalVisible] = useState(false)
  const [isMenuOpenProps, setIsMenuOpenProps] = useState(false)

  const [selectedWorkItem, setSelectedWorkItem] = useState({})

  const [formRef, setFormRef] = useState(null)
  const [selectedSprint, setSelectedSprint] = useState({})
  const COLUMNS = [
    { id: '0', title: <FormattedMessage {...messages.todo} />, list: todoList },
    {
      id: '1',
      title: <FormattedMessage {...messages.active} />,
      list: activeList,
    },
    {
      id: '2',
      title: <FormattedMessage {...messages.resolved} />,
      list: resolvedList,
    },
    { id: '3', title: <FormattedMessage {...messages.done} />, list: doneList },
  ]

  useEffect(() => {
    fetchSprintsFirstTime(projectId)
  }, [])

  useEffect(() => {
    setTodoList([])
    setActiveList([])
    setResolvedList([])
    setDoneList([])
    setSelectedSprint('')
    if (!isEmpty(selectedSprintId) && selectedSprintId !== undefined) {
      const pos = sprints.data.findIndex(s => s.id === selectedSprintId)

      if (sprints.data[pos].workItems) {
        setTodoList(
          sprints.data[pos].workItems.filter(w => w.state === TODO_STATE),
        )
        setActiveList(
          sprints.data[pos].workItems.filter(w => w.state === ACTIVE_STATE),
        )
        setResolvedList(
          sprints.data[pos].workItems.filter(w => w.state === RESOLVED_STATE),
        )
        setDoneList(
          sprints.data[pos].workItems.filter(w => w.state === DONE_STATE),
        )
      }
      setSelectedSprint(sprints.data[pos])
    }
  }, [sprints])
  const onUpdateWorkItemState = (state, workItemId) => {
    updateWorkItemState(selectedSprintId, workItemId, { state: Number(state) })
  }

  const myMenu = (workItemId, workItem) => (
    <Menu>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title={<FormattedMessage {...messages.confirmMessage} />}
          onConfirm={() => {
            deleteWorkItem(selectedSprintId, workItemId)
            setIsAddWorkItemModalVisible(false)
          }}
          okText={<FormattedMessage {...messages.yes} />}
          cancelText={<FormattedMessage {...messages.no} />}
        >
          <a href="#">{<FormattedMessage {...messages.delete} />}</a>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item>
        <a
          href="#"
          onClick={() => {
            setSelectedWorkItem(workItem)
            setIsUpdateWorkItemModalVisible(true)
            setIsAddWorkItemModalVisible(false)
          }}
        >
          {<FormattedMessage {...messages.update} />}
        </a>
      </Menu.Item>
    </Menu>
  )
  const handleAddWorkItem = (name, type) => {
    const workItem = {
      name,
      type: Number(type),
      state: 0,
      sprintId: selectedSprintId,
      projectId,
    }
    addWorkItem(workItem)
    setIsAddWorkItemModalVisible(false)
  }
  const handleUpdateWorkItem = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      let { state } = selectedWorkItem
      if (
        values.type === BUG_TYPE.toString() &&
        selectedWorkItem.state === DONE_STATE
      ) {
        state = RESOLVED_STATE
      } else if (
        values.type === TASK_TYPE.toString() &&
        selectedWorkItem.state === RESOLVED_STATE
      ) {
        state = DONE_STATE
      }
      const workItem = {
        ...selectedWorkItem,
        ...values,
        type: Number(values.type),
        projectId,
      }
      updateWorkItem(selectedSprintId, selectedWorkItem.id, workItem)
      if (state !== selectedWorkItem.state) {
        updateWorkItemState(selectedSprintId, selectedWorkItem.id, {
          state,
        })
      }
      handleUpdateWorkItemModalClose()
    })
  }
  const handleUpdateWorkItemModalClose = () => {
    setIsUpdateWorkItemModalVisible(false)
  }

  const handleAddSprint = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const Sprint = {
        startDate: values.sprintDates[0],
        dueDate: values.sprintDates[1],
        projectId,
      }
      addSprint(Sprint)
    })
  }
  useEffect(() => {
    if (isEmpty(errors) && isAddSprintModalVisible) {
      const { form } = formRef.props
      form.resetFields()
      handleAddSprintModalClose()
    }
  }, [errors])

  const handleAddSprintModalClose = () => {
    setIsAddSprintModalVisible(false)
  }

  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
  }

  const renderMemberFullName = memberId => {
    if (selectedProject.data.members) {
      const filteredMember = selectedProject.data.members.find(
        member => member.memberId === memberId,
      )
      if (filteredMember) {
        return filteredMember.fullName
      }
      return EMPTY_VALUE
    }
    return EMPTY_VALUE
  }

  const canDragWorkItem = () => {
    const { startDate } = selectedSprint
    const now = moment().format(YEAR_MONTH_DAY_DATE_FORMAT)
    if (now >= moment(startDate).format(YEAR_MONTH_DAY_DATE_FORMAT)) {
      return true
    }
    return false
  }

  const helmetMessages = {
    helmetTitle: intl.formatMessage({
      ...messages.helmetTitle,
    }),
    helmetDescription: intl.formatMessage({
      ...messages.helmetDescription,
    }),
  }
  const renderSprintPeriod = (startDate, dueDate) => {
    const period = Number(moment(dueDate).diff(startDate, 'days'))
    return `${period + 1} `
  }
  return (
    <div className="sprint-board">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>

      <Row gutter={24} type="flex" className="row-title">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          {selectedProject.data && !sprints.loading && (
            <PageHeader
              onBack={() => {
                window.history.back()
              }}
              title={selectedProject.data.name}
            />
          )}
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <div className="sprint-filter global-flex-horizontal-end">
            {sprints.data && !sprints.loading && (
              <Select
                style={{ width: 150 }}
                size="small"
                showSearch
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                optionFilterProp="children"
                placeholder={<FormattedMessage {...messages.chooseSprint} />}
                value={selectedSprintId || undefined}
                onChange={value => {
                  fetchWorkItems(value)
                  setIsAddWorkItemModalVisible(false)
                }}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    {isContentArchitect(role) && (
                      <>
                        <Divider style={{ margin: '4px 0' }} />

                        <div
                          onMouseDown={() => {
                            setIsAddSprintModalVisible(true)
                            setIsAddWorkItemModalVisible(false)
                          }}
                          className="sprint-item"
                        >
                          <Icon type="plus" />{' '}
                          <FormattedMessage {...messages.createSprint} />
                        </div>
                      </>
                    )}
                  </div>
                )}
              >
                {sprints.data.map(s => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            )}
            {selectedSprint.startDate && selectedSprint.dueDate && (
              <>
                <Divider type="vertical" className="vertical-divider" />

                <div className="sprint-dates">
                  <PostDate date={selectedSprint.startDate} /> -&nbsp;
                  <PostDate date={selectedSprint.dueDate} />
                  <div className="subtitle">
                    {renderSprintPeriod(
                      selectedSprint.startDate,
                      selectedSprint.dueDate,
                    )}
                    <FormattedMessage {...messages.workDays} />
                  </div>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Spin spinning={sprints.loading}>
        <div className="content">
          <Row gutter={24}>
            {sprints.data && !isEmpty(sprints.data) ? (
              COLUMNS.map(column => (
                <Col xs={24} sm={12} md={6} lg={6} xl={6} key={column.id}>
                  <Droppable
                    id={column.id}
                    onUpdateWorkItemState={onUpdateWorkItemState}
                  >
                    <div className="title">
                      <span>{column.title} </span>
                      <Badge
                        count={column.list.length}
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#f9efc8',
                          color: '#ffcf20',
                          fontWeight: 'bold',
                          width: '31px',
                        }}
                      />
                    </div>
                    {column.list.map(workItem => (
                      <Draggable
                        id={workItem.id}
                        key={workItem.id}
                        type={workItem.type}
                        canDrag={canDragWorkItem()}
                      >
                        <WorkItem
                          name={workItem.name}
                          completionDate={
                            workItem.completionDate && (
                              <PostDate date={workItem.completionDate} />
                            )
                          }
                          type={workItem.type}
                          fullName={renderMemberFullName(workItem.assignedTo)}
                          workItem={workItem}
                          menu={myMenu(workItem.id, workItem)}
                          isMenuOpen={isMenuOpenProps}
                          setIsMenuOpen={setIsMenuOpenProps}
                          setIsUpdateWorkItemModalVisible={
                            setIsUpdateWorkItemModalVisible
                          }
                          isUpdateWorkItemModalVisible={
                            isUpdateWorkItemModalVisible
                          }
                          setSelectedWorkItem={setSelectedWorkItem}
                          setIsAddWorkItemModalVisible={
                            setIsAddWorkItemModalVisible
                          }
                        />
                      </Draggable>
                    ))}
                    {column.id === TODO_STATE.toString() && selectedSprintId && (
                      <>
                        {isAddWorkItemModalVisible && (
                          <AddWorkItem
                            addWorkItem={handleAddWorkItem}
                            onCancel={() => setIsAddWorkItemModalVisible(false)}
                          />
                        )}
                        {!isAddWorkItemModalVisible && (
                          <div
                            className="plus"
                            onClick={() => setIsAddWorkItemModalVisible(true)}
                          >
                            +
                          </div>
                        )}
                      </>
                    )}
                  </Droppable>
                </Col>
              ))
            ) : (
              <Alert
                message={<FormattedMessage {...messages.noSprintsTitle} />}
                description={
                  <FormattedMessage {...messages.noSprintsContent} />
                }
                type="info"
              />
            )}
          </Row>
        </div>
      </Spin>
      {isUpdateWorkItemModalVisible && (
        <WorkItemModal
          wrappedComponentRef={saveFormRef}
          isVisible={isUpdateWorkItemModalVisible}
          handleCancel={handleUpdateWorkItemModalClose}
          handleOk={handleUpdateWorkItem}
          name={selectedWorkItem.name}
          description={selectedWorkItem.description}
          type={selectedWorkItem.type}
          assignTo={selectedWorkItem.assignTo}
          sprints={sprints.data}
          sprintId={selectedSprintId}
          members={selectedProject.data.members}
          memberId={selectedWorkItem.assignedTo}
        />
      )}

      {isAddSprintModalVisible && (
        <SprintModal
          wrappedComponentRef={saveFormRef}
          isVisible={isAddSprintModalVisible}
          handleCancel={handleAddSprintModalClose}
          handleOk={handleAddSprint}
        />
      )}
    </div>
  )
}

SprintBoard.propTypes = {
  sprints: PropTypes.object.isRequired,

  selectedSprintId: PropTypes.string.isRequired,
  selectedProject: PropTypes.object.isRequired,
  fetchSprintsFirstTime: PropTypes.func.isRequired,
  updateWorkItemState: PropTypes.func.isRequired,
  deleteWorkItem: PropTypes.func.isRequired,
  fetchWorkItems: PropTypes.func.isRequired,
  addWorkItem: PropTypes.func.isRequired,
  updateWorkItem: PropTypes.func.isRequired,
  addSprint: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  role: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
}

export default injectIntl(SprintBoard)
