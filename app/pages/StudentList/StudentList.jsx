/**
 *
 * StudentList
 *
 */

import React, { useState } from 'react'
import debounce from 'lodash/debounce'
import { Button, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import NodeModal from './NodeModal'
import Student from './Student'
// import PropTypes from 'prop-types';

import './student-list.scss'

class StudentList extends React.Component {
  state = {
    isVisible: false,
    formRef: null,
    show: true,
    students: [],
    filter: '',
    data: [],
    fetching: true,
  }

  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
  }

  static propTypes = {
    getStudents: PropTypes.func.isRequired,
  }

  fetchUser = () => {
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch(`http://dummy.restapiexample.com/api/v1/employees`)
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        const data = body.map(user => ({
          text: `${user} `,
          value: user,
        }))
        this.setState({ data, fetching: false })
      })
  }

  async componentWillMount() {
    this.setState({
      students: this.Students,
    })
    await this.fetchUser()
  }

  Students = () => {
    this.setState({
      students: this.getStudents(),
    })
  }

  Visibility = visible => {
    this.setState({ isVisible: visible })
  }

  Delete = el => {
    const index = this.Students.indexOf(el)
    if (index > -1) {
      this.Students.splice(index, 1)
    }
    this.setState({
      students: this.Students,
    })
  }

  saveFormRef = formRefParameter => {
    this.setState({ formRef: formRefParameter })
  }

  validate = () => {
    const { form } = this.state.formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      form.resetFields()
      const { nodeTitle, nodeDescription, lastName, Picture } = values
      this.studentAdd(nodeTitle, nodeDescription, lastName, Picture)
      this.setState({
        isVisible: false,
      })
    })
  }

  filter = e => {
    this.setState({
      filter: e,
    })
  }

  Students = [
    {
      name: 'a',
      email: 'a@test.a',
      enrollment: '1',
    },
    {
      name: 'b',
      email: 'a@test.a',
      enrollment: '2',
    },
    {
      name: 'c',
      email: 'a@test.a',
      enrollment: '3',
    },
    {
      name: 'd',
      email: 'a@test.a',
      enrollment: '4',
    },
    {
      name: 'e',
      email: 'a@test.a',
      enrollment: '5',
    },
    {
      name: 'f',
      email: 'a@test.a',
      enrollment: '6',
    },
    {
      name: 'g',
      email: 'a@test.a',
      enrollment: '10',
    },
    {
      name: 'h',
      email: 'a@test.a',
      enrollment: '11',
    },
  ]

  studentAdd = (name, email, key) =>
    this.Students.push({ name, email, enrollment: key })

  ModalClose = () => {
    const { form } = this.state.formRef.props
    form.resetFields()
    this.setState({
      isVisible: false,
    })
  }

  render() {
    const filteredStudents = this.state.data.filter(
      el =>
        el.value.employee_name
          .toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) !== -1,
    )
    const { getStudents } = this.props
    console.log(this.props)
    return (
      <div>
        <Input
          placeholder="Serach for Student"
          onChange={e => this.filter(e.target.value)}
        />
        {console.log(
          this.state.data.length !== 0
            ? this.state.data[0].value.employee_name
            : null,
        )}
        <Helmet>
          <title>StudentList</title>
          <meta name="description" content="Description of StudentList" />
        </Helmet>
        <div className="student-list">
          {filteredStudents.map(el => (
            <div className={`${this.state.show}`}>
              <Student
                name={el.value.employee_name}
                email={el.value.employee_name}
                enrollment={el.value.id}
                deleteFunc={e => this.Delete(el)}
              />
            </div>
          ))}
          <div className="add-button">
            <Button
              type="primary"
              shape="circle"
              icon="user-add"
              size="large"
              onClick={e => this.Visibility(true)}
            />
          </div>
          <NodeModal
            wrappedComponentRef={this.saveFormRef}
            isVisible={this.state.isVisible}
            handleCancel={this.ModalClose}
            handleOk={() => this.validate()}
          />
        </div>
      </div>
    )
  }
}

StudentList.propTypes = {}
export default Form.create({ name: 'StudentList' })(StudentList)
