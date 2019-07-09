/**
 *
 * DeveloperStart
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Form, Input, Radio, Upload, Button, Icon, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { makeStyles } from '@material-ui/core/styles'

import MenuItem from '@material-ui/core/MenuItem'

import Selects from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import './developer-start.scss'
import FooterButtons from 'pages/ConnectLanding/FooterButtons'
import ConnectPartners from 'pages/ConnectLanding/ConnectPartners'
import ConnectHeader from '../../ConnectLanding/ConnectHeader'
import ConnectSuccess from '../../ConnectSuccess'

const { Option } = Select

class DeveloperStart extends React.Component {
  state = {
    step: 1,
    width: 0,
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    totalWorking: '',
    typeDev: '',
    yearExperience: '',
    speciality: '',
    cv: 'cv.pdf',
    skills: [],
    skills1: [],
    skills2: [],
    country: 'Tunisie',
    linkedin: '',
    github: '',
    sitePerso: '',
    levelStudies: '',
    otherType: '',
    salary: '',
    data: [],
    value: [],
    fetching: false,
  }

  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
  }

  handleSubmit = (e, attribute, value) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          step: this.state.step + 1,
          width: this.state.width + 15,
        })
      }
    })
  }

  normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  year = el => {
    const { skills } = this.state
    skills.map(skill => {
      if (skill.name == el.name) {
        return skill.year
      }
      console.log(skill.year)
    })
  }

  fetchUser = value => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch(`https://technologies-api.gomycode.co/skill/${value}`)
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

  handleSend = (e, func, value) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        func(value)
      }
    })
  }

  handleValidate = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('validate')
      }
    })
  }

  getValue = (attribute, value) => {
    this.setState({
      [attribute]: value,
    })
  }

  getTechnology = skills => {
    this.setState({
      skills: this.state.skills.concat({
        name: skills,
        year: '1',
      }),
    })
  }

  handleChange = value => {
    this.setState({
      value: 0,
      data: [],
      fetching: false,
    })
  }

  getTechnologyone = skills => {
    this.setState({
      skills1: this.state.skills1.concat([skills]),
    })
  }

  getTechnologytwo = skills => {
    this.setState({
      skills2: this.state.skills2.concat([skills]),
    })
  }

  PrevComp = e => {
    this.setState({
      step: e,
      width: this.state.width - 15,
    })
  }

  handleDelete = chipToDelete => () => {
    const postSkill = this.state.skills.filter(
      skill => skill.name != chipToDelete,
    )
    this.setState({
      skills: postSkill,
    })
  }

  handleDelete1 = chipToDelete => () => {
    const postSkill = this.state.skills1.filter(skill => skill != chipToDelete)
    this.setState({
      skills1: postSkill,
    })
  }

  handleDelete2 = chipToDelete => () => {
    const postSkill = this.state.skills2.filter(skill => skill != chipToDelete)
    this.setState({
      skills2: postSkill,
    })
  }

  render() {
    const { postDevelepor } = this.props
    console.log(this.props)
    const holder = 'Spécialité: Ex. Génie logiciel, Réseaux, Biochimie...'

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      paddingBottom: '6px',
    }
    const Start = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Prêts à travailler avec les plus grandes entreprises tech?
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div style={{ display: 'flex' }}>
            <Form.Item style={{ width: '45%' }}>
              {getFieldDecorator('Firstname', {
                initialValue: this.state.firstName,
                rules: [{ required: false, message: 'Donnez votre Prènom!' }],
              })(
                <Input
                  type={Input.TextArea}
                  onChange={e => this.getValue('firstName', e.target.value)}
                  style={{
                    marginRight: '35px',
                    backgroundColor: 'transparent',
                  }}
                  placeholder="Prènom"
                />,
              )}
            </Form.Item>
            <Form.Item style={{ width: '50%', marginLeft: '40px' }}>
              {getFieldDecorator('lastname', {
                initialValue: this.state.lastName,
                rules: [{ required: false, message: 'Donnez votre Nom!' }],
              })(
                <Input
                  style={{ backgroundColor: 'transparent' }}
                  onChange={e => this.getValue('lastName', e.target.value)}
                  placeholder="Nom"
                />,
              )}
            </Form.Item>
          </div>
          <Form.Item>
            {getFieldDecorator('Email', {
              initialValue: this.state.email,
              rules: [{ required: false, message: 'Donnez votre Email!' }],
            })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('email', e.target.value)}
                placeholder="Email"
                value={this.state.email}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              initialValue: this.state.phone,
              rules: [
                {
                  required: true,
                  message: 'Donnez votre numéro de téléphone!',
                },
              ],
            })(
              <Input
                onChange={e => this.getValue('phone', e.target.value)}
                placeholder="Numéro de téléphone (ex. +216 123 456)"
                style={{ width: '100%', backgroundColor: 'transparent' }}
                value="123456789"
                defaultValue="123456789"
              />,
            )}
          </Form.Item>
          <FooterButtons
            step={this.state.step}
            disabled={
              this.state.firstName.length === 0 ||
              this.state.lastName.length === 0 ||
              this.state.email.length === 0 ||
              this.state.phone.length === 0
            }
          />
        </Form>
      </div>
    )
    const Duration = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Combien de temps avez-vous travaillé en tant que développeur ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group', {
              initialValue: this.state.totalWorking,
              rules: [
                { required: false, message: 'Donnez votre durée de travail' },
              ],
            })(
              <Radio.Group
                onChange={e => this.getValue('totalWorking', e.target.value)}
              >
                <Radio style={radioStyle} value="Jamais">
                  Jamais
                </Radio>
                <Radio style={radioStyle} value="Moins d'un an">
                  Moins d'un an
                </Radio>
                <Radio style={radioStyle} value="De 1 à 3 ans">
                  De 1 à 3 ans
                </Radio>
                <Radio style={radioStyle} value="De 3 à 5 ans">
                  De 3 à 5 ans
                </Radio>
                <Radio style={radioStyle} value="Plus de 5 ans">
                  Plus de 5 ans
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <FooterButtons
            prevComponent={() => this.PrevComp(5)}
            disabled={this.state.totalWorking.length === 0}
          />
        </Form>
      </div>
    )
    const Chips = ({ name, el }) => (
      <div style={{ fontSize: '16px' }}>
        {name}
        <Selects
          style={{
            borderBottom: 'transparent',
            color: 'white',
            marginLeft: '5px',
          }}
          autoWidth="true"
          value={el.year}
          onChange={e => {
            const { skills } = this.state
            skills.map(skill => {
              if (skill.name == el.name) {
                skill.year = e.target.value
              }
            })
            this.setState({ skills }, () => {
              console.log(this.state)
            })
          }}
          inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
          }}
        >
          <MenuItem style={{ borderBottom: 'transparent' }} value="1">
            +1
          </MenuItem>
          <MenuItem value="2">+2</MenuItem>
          <MenuItem value="3">+3</MenuItem>
          <MenuItem value="4">+4</MenuItem>
          <MenuItem value="5">+5</MenuItem>
          <MenuItem value="5+">5+</MenuItem>
        </Selects>
      </div>
    )
    const Technology = () => (
      <div>
        <div className="step">
          <div className="step-header" style={{ fontWeight: '400' }}>
            Quelles sont les technologies que vous maitrisez ?
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('Technology', {
                rules: [
                  {
                    required: false,
                    message: 'Donnez les technologies!',
                  },
                ],
              })(
                <Select
                  autoClearSearchValue
                  showSearch
                  labelInValue
                  value={this.state.value}
                  placeholder="(ex, React, Javascript, jQuery, etc)"
                  notFoundContent={
                    this.state.fetching ? <Spin size="small" /> : null
                  }
                  filterOption={false}
                  onSearch={this.fetchUser}
                  onChange={this.handleChange}
                  onSelect={e => this.getTechnology(e.label)}
                  style={{ width: '100%', backgroundColor: 'transparent' }}
                >
                  {this.state.data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <div>
              {this.state.skills.map(el => (
                <Chip
                  style={{ marginRight: '10px' }}
                  label={<Chips name={el.name} el={el} />}
                  color="primary"
                  onDelete={this.handleDelete(el.name)}
                />
                // this.state.skills.find(e => e == el.name).indexOf() != -1
                // ? this.state.skills.splice(
                //     this.state.skills.find(e => e == el.name).indexOf(),
                //     1,
                //   )
                // : this.state.skills.shift()
                // <Tag
                //   onClose={e =>
                //     this.state.skill.find(e => (e = el.name)).indexOf() != -1
                //       ? this.state.skill.splice(
                //         this.state.skill.find(e => (e = el.name)).indexOf(),
                //         1,
                //       )
                //       : this.state.skill.shift()
                //   }
                //   closable
                //   color="#2a4bd8"
                //   style={{  margin: '3px' }}
                // >
                //   <label style={{ marginTop: '6px' }}> {el.name} </label>
                //   <Select
                //     onSelect={e => {
                //       const { skills } = this.state
                //       skills.map(skill => {
                //         if (skill.name == el.name) {
                //           skill.year = e
                //         }
                //       })
                //       this.setState({ skills }, () => {
                //         console.log(this.state)
                //       })
                //     }}
                //     defaultValue={['1']}
                //     style={{
                //       width: '50px',
                //       float: 'right',
                //       marginLeft: '10px',
                //       marginRight: '-5px',
                //       borderRadius: '50px',
                //     }}
                //   >
                //     <Option value="1">+1</Option>
                //     <Option value="2">+2</Option>
                //     <Option value="3">+3</Option>
                //     <Option value="4">+4</Option>
                //     <Option value="5">+5</Option>
                //     <Option value="5+">5+</Option>
                //   </Select>
                // </Tag>
              ))}
            </div>
            <div>
              <div className="step-header">
                Quelles sont vos technologies préférées ?
              </div>
              <Form.Item>
                {getFieldDecorator('Technology1', {
                  initialValue: this.state.skills1,
                  rules: [
                    {
                      required: false,
                      message: 'Donnez les technologies!',
                    },
                  ],
                })(
                  <Select
                    showSearch
                    labelInValue
                    value={this.state.value}
                    placeholder="Technologies souhaitées (ex., React, Javascript, jQuery, etc.)"
                    notFoundContent={
                      this.state.fetching ? <Spin size="small" /> : null
                    }
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChange}
                    onSelect={e => this.getTechnologyone(e.label)}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      marginBottom: '15px',
                    }}
                  >
                    {this.state.data.map(d => (
                      <Option key={d.value}>{d.text}</Option>
                    ))}
                  </Select>,
                )}
                {this.state.skills1.map(el => (
                  <Chip
                    label={el}
                    color="primary"
                    onDelete={this.handleDelete1(el)}
                  />
                  // <Tag
                  //   onClose={e =>
                  //     this.state.skills1.find(e => (e = el)).indexOf() != -1
                  //       ? this.state.skills1.splice(
                  //         this.state.skills1.find(e => (e = el)).indexOf(),
                  //         1,
                  //       )
                  //       : this.state.skills1.shift()
                  //   }
                  //   closable
                  //   color="#2a4bd8"
                  //   style={{
                  //     margin: '3px',
                  //     marginTop: '8px',
                  //   }}
                  // >
                  //   <label style={{ marginTop: '6px' }}> {el} </label>
                  // </Tag>
                ))}
              </Form.Item>
            </div>
            <div>
              <div className="step-header">
                Quelles technologies aimeriez-vous apprendre ?
              </div>
              <Form.Item>
                {getFieldDecorator('Technology2', {
                  initialValue: this.state.skills2,
                  rules: [
                    {
                      required: false,
                      message: 'Donnez les technologies!',
                    },
                  ],
                })(
                  <Select
                    showSearch
                    labelInValue
                    value={this.state.value}
                    placeholder="Technologies souhaitées (ex., React, Javascript, jQuery, etc.)"
                    notFoundContent={
                      this.state.fetching ? <Spin size="small" /> : null
                    }
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChange}
                    onSelect={e => this.getTechnologytwo(e.label)}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      marginBottom: '15px',
                    }}
                  >
                    {this.state.data.map(d => (
                      <Option key={d.value}>{d.text}</Option>
                    ))}
                  </Select>,
                )}
                {this.state.skills2.map(el => (
                  <Chip
                    label={el}
                    color="primary"
                    onDelete={this.handleDelete2(el)}
                  />
                  // <Tag
                  //   closable
                  //   onClose={e =>
                  //     this.state.skills2.find(e => (e = el)).indexOf() != -1
                  //       ? this.state.skills2.splice(
                  //           this.state.skills2.find(e => (e = el)).indexOf(),
                  //           1,
                  //         )
                  //       : this.state.skills2.shift()
                  //   }
                  //   color="#2a4bd8"
                  //   style={{
                  //     margin: '3px',
                  //     marginTop: '8px',
                  //   }}
                  // >
                  //   {console.log(this.state.skills2)}
                  //   <label style={{ marginTop: '6px' }}> {el} </label>
                  // </Tag>
                ))}
              </Form.Item>
            </div>
            <FooterButtons
              prevComponent={() => this.PrevComp(2)}
              disabled={
                this.state.skills.length === 0 ||
                this.state.skills2.length === 0 ||
                this.state.skills1.length === 0
              }
            />
          </Form>
        </div>
      </div>
    )
    const Type = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel type de développeur êtes-vous ?
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('radio-group-seventeen', {
              initialValue: this.state.typeDev,
              rules: [{ required: false, message: 'Selectionnez votre type' }],
            })(
              <Radio.Group
                onChange={e => this.getValue('typeDev', e.target.value)}
              >
                <Radio style={radioStyle} value="Développeur Front-End">
                  Développeur Front-End
                </Radio>
                <Radio style={radioStyle} value="Développeur Back-End">
                  Développeur Back-End
                </Radio>
                <Radio style={radioStyle} value="Développeur Fullstack">
                  Développeur Fullstack
                </Radio>
                <Radio style={radioStyle} value="Data Scientist">
                  Data Scientist
                </Radio>
                <Radio style={radioStyle} value="Ingénieur DevOps">
                  Ingénieur DevOps
                </Radio>
                <Radio style={radioStyle} value="Autres">
                  Autres
                  {this.state.typeDev === 'Autres' ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.otherType}
                      onChange={e => this.getValue('otherType', e.target.value)}
                     
                    />
                  ) : null}
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <FooterButtons
            prevComponent={() => this.PrevComp(1)}
            disabled={
              this.state.typeDev.length === 0 ||
              (this.state.typeDev === 'Autres' &&
                this.state.otherType.length === 0)
            }
          />
        </Form>
      </div>
    )
    const Validation = () => (
      <div className="step">
        <h1
          className="apply_form-header text-left"
          style={{ marginTop: '25px' }}
        >
          Informations personnelles
        </h1>
        <h2 className="apply_form-subheader text-left">
          Nous avons besoin des informations ci-dessous pour mieux vous
          connaître.
        </h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="Téléchargez votre CV ici">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="http://localhost:8000/api/picture">
                <Button disabled = 'true'>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Country', {
              initialValue: this.state.country,
              rules: [{ required: false, message: 'Choisissez votre pays!' }],
            })(
              <Select
                placeholder="Selectionner votre pays"
                onSelect={e => this.getValue('country', e)}
                style={{ width: '100%' }}
                onChange={e => e}
              >
                <Option value="Tunisie">Tunisie</Option>
                <Option value="France">France</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Linkedin', {
              initialValue: this.state.linkedin,
            })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('linkedin', e.target.value)}
                placeholder="Insérez le lien de votre profil Linkedin"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Github', { initialValue: this.state.github })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('github', e.target.value)}
                placeholder="Insérez le lien de votre profil Github"
                style={{ width: '100%' }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Site', { initialValue: this.state.sitePerso })(
              <Input
                onChange={e => this.getValue('sitePerso', e.target.value)}
                placeholder="Site personnel"
                style={{ width: '100%', backgroundColor: 'transparent' }}
              />,
            )}
          </Form.Item>
          <FooterButtons
            validate={() => {
              const postData = this.state
              postData.skills = postData.skills.map(skill => [
                skill.name,
                skill.year,
              ])
              if (postData.otherType !== '' && postData.typeDev === 'Autres') {
                postData.typeDev = postData.otherType
              }
              postDevelepor(postData)
              console.log(this.props)
            }}
            prevComponent={() => this.PrevComp(6)}
            step={this.state.step}
            disabled={
              this.state.country.length === 0 ||
              this.state.sitePerso.length === 0 ||
              this.state.github.length === 0 ||
              this.state.linkedin.length === 0
            }
          />
        </Form>
      </div>
    )
    const LevelStudies = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel est votre niveau d'études ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group', {
              initialValue: this.state.levelStudies,
              rules: [
                { required: false, message: 'Donnez votre durée de travail' },
              ],
            })(
              <Radio.Group
                onChange={e => this.getValue('levelStudies', e.target.value)}
              >
                <Radio style={radioStyle} value="BTS">
                  BTS
                  {this.state.levelStudies === 'BTS' ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                     
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Licence">
                  Licence
                  {this.state.levelStudies === 'Licence' ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                     
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Master">
                  Master
                  {this.state.levelStudies === 'Master' ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                     
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Cycle d'ingénieurs">
                  Cycle d'ingénieurs
                  {this.state.levelStudies === "Cycle d'ingénieurs" ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Maîtrise">
                  Maîtrise
                  {this.state.levelStudies === 'Maîtrise' ? (
                    <Input
                    className='input-holder'
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
               
                    />
                  ) : null}
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <FooterButtons
            prevComponent={() => this.PrevComp(3)}
            disabled={this.state.speciality.length === 0}
          />
        </Form>
      </div>
    )
    const Professional = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel est votre niveau d'expérience professionnelle ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group-thirteen', {
              initialValue: this.state.yearExperience,
              rules: [{ required: false, message: 'Donnez votre niveau' }],
            })(
              <Radio.Group
                onChange={e => this.getValue('yearExperience', e.target.value)}
              >
                <Radio style={radioStyle} value="Aucnue">
                  Aucune
                </Radio>
                <Radio style={radioStyle} value="Moins d'un an">
                  Moins d'un an
                </Radio>
                <Radio style={radioStyle} value="Entre 1 et 3 ans">
                  Entre 1 et 3 ans
                </Radio>
                <Radio style={radioStyle} value="Entre 3 et 5 ans">
                  Entre 3 et 5 ans
                </Radio>
                <Radio style={radioStyle} value="Plus de 5 ans">
                  Plus de 5 ans
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <FooterButtons
            prevComponent={() => this.PrevComp(4)}
            disabled={this.state.yearExperience.length === 0}
          />
        </Form>
      </div>
    )
    const Salary = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel sont vos prétentions financières ?{' '}
          <span style={{ fontSize: '8px', fontWeight: '300' }}> (en TND)</span>{' '}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group-sixteen', {
              initialValue: this.state.Salary,
              rules: [
                {
                  required: false,
                  message: 'Donnez votre prétention financière',
                },
              ],
            })(
              <Radio.Group
                onChange={e => this.getValue('Salary', e.target.value)}
              >
                <Radio style={radioStyle} value="salarié">
                  Cas Salarié
                  {this.state.levelStudies === 'salarié' ? (
                    <Input
                      placeholder="Ex 200TND/jour"
                      className='input-holder'
                     
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="freelance">
                  Cas Freelance
                  {this.state.levelStudies === 'freelance' ? (
                    <Input
                    className='input-holder'
                      placeholder="Ex 200TND/jour"
                    
                    />
                  ) : null}
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <FooterButtons
            prevComponent={() => this.PrevComp(3)}
            disabled={this.state.salary.length === 0}
          />
        </Form>
      </div>
    )
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div>
          <ConnectHeader />
          <div>
            <div className="connect-body-response">
              <div className="progressbar">
                {this.state.step !== 8 && (
                  <div style={{ width: `${this.state.width}%` }} />
                )}
              </div>
              {this.state.step === 1 && Start()}
              {this.state.step === 2 && Type()}
              {this.state.step === 3 && Technology()}
              {this.state.step === 4 && LevelStudies()}
              {this.state.step === 5 && Professional()}
              {this.state.step === 6 && Duration()}
              {this.state.step === 7 && Validation()}
              {this.state.step === 8 && <ConnectSuccess company="false" />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DeveloperStart.propTypes = {}

export default Form.create({ name: 'DeveloperStart' })(DeveloperStart)
