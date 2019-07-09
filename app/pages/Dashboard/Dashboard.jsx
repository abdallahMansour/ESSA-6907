/* eslint-disable global-require */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Icon } from 'antd'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Helmet } from 'react-helmet'
import { isContentArchitect } from 'shared/utils/access-token'
import messages from './messages'
import './dashboard.scss'
import ProjectCard from './ProjectCard/ProjectCard'
import CreateProject from './CreateProject'

const { Search } = Input

const Dashboard = ({
  projects,
  fetchProjects,
  addProject,
  deleteProject,
  role,
  intl,
}) => {
  const [cards, setCards] = useState(projects.data ? projects.data : [])
  const [formRef, setFormRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const ModalClose = () => {
    setIsVisible(false)
  }

  const handleSearch = value => {
    setCards(
      projects.data.filter(e =>
        e.name.toLowerCase().includes(value.toLowerCase()),
      ),
    )
  }

  const handleDelete = id => {
    deleteProject(id)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.data) {
      setCards(projects.data)
    }
  }, [projects])

  const handleAddProject = () => {
    const { form } = formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const newProject = {
        name: values.name,
        description: values.description,
        startDate: values.projectDates[0],
        dueDate: values.projectDates[1],
      }
      addProject(newProject)
      ModalClose()
    })
  }

  const saveFormRef = formRefParameter => {
    setFormRef(formRefParameter)
    if (formRef) {
      const { form } = formRef.props
      form.resetFields()
    }
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
    <div className="dashboard">
      <Helmet>
        <title>{helmetMessages.helmetTitle}</title>
        <meta name="description" content={helmetMessages.helmetDescription} />
      </Helmet>

      <div className="dashboard-content">
        <Row>
          <Col>
            <Row gutter={48} align="bottom">
              <div className="project">
                <Col xs={24} sm={24} md={15} lg={17} xl={18} xxl={19}>
                  <div className="project-title">
                    <FormattedMessage {...messages.allproject} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={9} lg={7} xl={6} xxl={5}>
                  <div className="search-bar">
                    <Search
                      placeholder={intl.formatMessage({
                        ...messages.search,
                      })}
                      onChange={e => handleSearch(e.target.value)}
                      style={{ width: 200 }}
                    />
                  </div>
                </Col>
              </div>
            </Row>
            <Row>
              <ProjectCard
                cards={cards}
                projects={projects}
                deleteProject={handleDelete}
                role={role}
              />
            </Row>
            {isContentArchitect(role) && (
              <Row className="row-style">
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Button
                    type="dashed"
                    className="add-card-style"
                    size="large"
                    onClick={() => setIsVisible(true)}
                  >
                    <Icon
                      type="plus-circle"
                      theme="filled"
                      twoToneColor="#2a4bd8"
                      className="project-plus-icon"
                    />
                    <br />
                    <h3>
                      <FormattedMessage {...messages.createproject} />
                    </h3>
                  </Button>

                  <CreateProject
                    wrappedComponentRef={saveFormRef}
                    isVisible={isVisible}
                    handleCancel={ModalClose}
                    handleOk={handleAddProject}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Dashboard)
