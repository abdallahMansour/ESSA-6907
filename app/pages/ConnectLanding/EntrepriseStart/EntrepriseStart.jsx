/**
 *
 * EntrepriseStart
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';

import './entreprise-start.scss'
import { Form, Input, Radio, Select, Tag, Checkbox, Spin } from 'antd'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormItem from 'antd/lib/form/FormItem'
import Selects from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import debounce from 'lodash/debounce'
import FooterButtons from '../FooterButtons'
import ConnectHeader from '../ConnectHeader'
import ConnectSuccess from '../../ConnectSuccess'
const { Option } = Select
class EntrepriseStart extends React.Component {
  state = {
    step: 1,
    width: 0,
    skills: [],
    firstName: '',
    lastName: '',
    phone: '',
    typeDev: '',
    company: '',
    typeContract: '',
    sizeCompany: '',
    hiringDeadline: '',
    speciality: '',
    email: '',
    levelStudies: '',
    yearExperience: '',
    otherTypeDev: '',
    otherContract: '',
    data: [],
    value: [],
    fetching: false,
    open: false,
  }

  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
  }

  onOpen = () => {
    this.setState({
      open: true,
    })
  }

  onClose = () => {
    this.setState({
      open: false,
    })
  }

  year = el => {
    const { skills } = this.state
    skills.map(skill => {
      if (skill.name == el.name) {
        return skill.level
      }
      console.log(skill.level)
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

  handleChange = value => {
    this.setState({
      value: 0,
      data: [],
      fetching: false,
    })
  }

  handleSubmit = e => {
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

  getValue = (attribute, value) => {
    this.setState({
      [attribute]: value,
    })
  }

  getTechnology = skills => {
    this.setState({
      skills: this.state.skills.concat({
        name: skills,
        level: 'Débutant',
      }),
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

  PrevComp = e => {
    this.setState({
      step: e,
      width: this.state.width - 15,
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const holder = 'Spécialité: Ex. Génie logiciel, Réseaux, Biochimie...'
    const { getFieldDecorator } = this.props.form
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
          value={el.level}
          onChange={e => {
            const { skills } = this.state
            skills.map(skill => {
              if (skill.name == el.name) {
                skill.level = e.target.value
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
          <MenuItem style={{ borderBottom: 'transparent' }} value="Débutant">
            Débutant
          </MenuItem>
          <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
          <MenuItem value="Avancé">Avancé</MenuItem>
          <MenuItem value="Expert">Expert</MenuItem>
        </Selects>
      </div>
    )
    const Start = () => (
      <div className="step">
        <div className="step-header" style={{ textAlign: 'center' }}>
          <div
            className="are-you-ready"
            style={{ fontWeight: '600', fontSize: '29px' }}
          >
            Prêts à recruter les meilleurs talents tech?
          </div>
          <span style={{ fontWeight: '400', fontSize: '22px' }}>
            Veuillez choisir le profil qui convient à vos besoins
          </span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group-two', {
              initialValue: this.state.typeDev,
              rules: [
                { required: false, message: 'Donnez le profil à recruter' },
              ],
            })(
              <Radio.Group
                onChange={e => this.getValue('typeDev', e.target.value)}
              >
                <Radio
                  style={radioStyle}
                  value="Développeurs"
                  style={{ marginBottom: '0px' }}
                >
                  <label style={{ fontWeight: '500' }}> Développeurs</label>

                  <div style={{ marginLeft: '25px', fontSize: '0.725rem' }}>
                    Front End, Back End, DevOps, QA, Automatisation,
                    Architecture des systèmes.
                  </div>
                </Radio>
                <Radio style={radioStyle} value="Data Scientists">
                  <label style={{ fontWeight: '500' }}> Data Scientists</label>
                  <div
                    style={{
                      marginLeft: '25px',
                      fontSize: '0.725rem',
                      marginTop: '-11px',
                    }}
                  >
                    DataViz, Business Analytics, Machine Learning, Data Mining.
                  </div>
                </Radio>
                <Radio
                  style={radioStyle}
                  value="Autres"
                  style={{ paddingTop: '40px' }}
                >
                  Autres
                  {this.state.typeDev === 'Autres' ? (
                    <Input
                      defaultValue={this.state.otherTypeDev}
                      onChange={e =>
                        this.getValue('otherTypeDev', e.target.value)
                      }
                      style={{
                        width: '150%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <FooterButtons
            step={this.state.step}
            disabled={
              this.state.typeDev.length === 0 ||
              (this.state.typeDev === 'Autres' &&
                this.state.otherTypeDev.length === 0)
            }
          />
        </Form>
      </div>
    )
    const Technology = () => (
      <div className="entreprise-technology">
        <div className="step">
          <div className="step-header" style={{ fontWeight: '400' }}>
            Quelles sont les technologies que vos futurs développeurs doivent
            maîtriser ?
          </div>
          <Form onSubmit={this.handleSubmit}>
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
                // <Tag
                //   onClose={e =>
                //     this.state.skills.find(e => (e = el)).indexOf() != -1
                //       ? this.state.skills.splice(
                //           this.state.skills.find(e => (e = el)).indexOf(),
                //           1,
                //         )
                //       : this.state.skills.shift()
                //   }
                //   closable
                //   color="#2a4bd8"
                //   style={{ margin: '3px', width: '223px' }}
                // >
                //   <label style={{ marginTop: '6px' }}> {el.name} </label>
                //   <Select
                //     onSelect={e => {
                //       const { skills } = this.state
                //       skills.map(skill => {
                //         if (skill.name == el.name) {
                //           skill.level = e
                //         }
                //       })
                //       this.setState({ skills }, () => {
                //         console.log(this.state)
                //       })
                //     }}
                //     defaultValue={['Débutant']}
                //     style={{
                //       width: '130px',
                //       float: 'right',
                //       marginLeft: '10px',
                //       marginRight: '-5px',
                //       borderRadius: '50px',
                //     }}
                //   >
                //     <Option value="Débutant">Débutant</Option>
                //     <Option value="Intermédiaire">Intermédiaire</Option>
                //     <Option value="Avancé">Avancé</Option>
                //     <Option value="Expert">Expert</Option>
                //   </Select>{' '}
                // </Tag>
              ))}
            </div>
            <FooterButtons
              prevComponent={() => this.PrevComp(1)}
              disabled={this.state.skills.length === 0}
            />
          </Form>
        </div>
      </div>
    )
    const Contrat = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel est le type de contrat proposé ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          {getFieldDecorator('checkbox-group', {
            initialValue: this.state.typeContract,
            rules: [{ required: false, message: "Donnez le type d'embauche" }],
          })(
            <Checkbox.Group onChange={e => this.getValue('typeContract', e[0])}>
              <Checkbox
                style={checkStyle}
                value="Freelance"
                style={{ marginBottom: '0px', marginLeft: '9px' }}
              >
                Freelance
                <div style={{ marginLeft: '25px', fontSize: '0.725rem' }}>
                  Il s'agit d'exercer une activité professionnelle avec la
                  qualité de travailleur indépendant.
                </div>
              </Checkbox>
              <Checkbox style={checkStyle} value="CDI">
                CDI
                <div
                  style={{
                    marginLeft: '25px',
                    fontSize: '0.725rem',
                    marginTop: '-12px',
                  }}
                >
                  Contrairement au CDI, le CDD intègre une date de fin, ou tout
                  du moins un terme.
                </div>
              </Checkbox>
              <Checkbox
                style={checkStyle}
                value="CDD"
                style={{ marginTop: '35px' }}
              >
                CDD
                <div style={{ marginLeft: '25px', fontSize: '0.725rem' }}>
                  Le contrat à durée indéterminée est la forme normale du
                  contrat de travail.
                </div>
              </Checkbox>
              <Checkbox style={checkStyle} value="Autres">
                Autres
                {this.state.typeContract === 'Autres' ? (
                  <Input
                    defaultValue={this.state.otherContract}
                    onChange={e =>
                      this.getValue('otherContract', e.target.value)
                    }
                    style={{
                      width: '100%',
                      marginLeft: 10,
                      height: '30px',
                      marginTop: '5px',
                      backgroundColor: 'transparent',
                    }}
                  />
                ) : null}
              </Checkbox>
            </Checkbox.Group>,
          )}
          <FooterButtons
            prevComponent={() => this.PrevComp(5)}
            disabled={
              (this.state.typeContract || []).length === 0 ||
              (this.state.typeContract === 'Autres' &&
                this.state.otherContract.length === 0)
            }
          />
        </Form>
      </div>
    )
    const Embauche = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quels sont vos délais d'embauche ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          {getFieldDecorator('radio-group-six', {
            initialValue: this.state.hiringDeadline,
            rules: [
              { required: false, message: "Donnez le délais d'embauche" },
            ],
          })(
            <Radio.Group
              onChange={e => this.getValue('hiringDeadline', e.target.value)}
            >
              <Radio style={radioStyle} value="Immédiatement">
                Immédiatement
              </Radio>
              <Radio style={radioStyle} value="1 à 2 semaines">
                1 à 2 semaines
              </Radio>
              <Radio style={radioStyle} value="Plus de 2 semaines">
                Plus de 2 semaines
              </Radio>
              <Radio style={radioStyle} value="Pas de date fixe">
                Pas de date fixe
              </Radio>
            </Radio.Group>,
          )}
          <FooterButtons
            prevComponent={() => this.PrevComp(4)}
            disabled={this.state.hiringDeadline.length === 0}
          />
        </Form>
      </div>
    )
    const Validation = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Votre demande a bien été enregistrée. Inscrivez-vous pour recevoir les
          meilleurs profils disponibles.
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div style={{ display: 'flex', marginBottom: '-5px' }}>
            <Form.Item style={{ width: '48%', marginRight: '25px' }}>
              {getFieldDecorator('Firstname', {
                initialValue: this.state.firstName,
                rules: [{ required: false, message: 'Donnez votre Prènom!' }],
              })(
                <Input
                  style={{ backgroundColor: 'transparent' }}
                  type={Input.TextArea}
                  onChange={e => this.getValue('firstName', e.target.value)}
                  placeholder="Prènom"
                />,
              )}
            </Form.Item>
            <Form.Item style={{ width: '50%', marginLeft: '5px' }}>
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
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Numéro de téléphone', {
              initialValue: this.state.phone,
              rules: [
                {
                  required: false,
                  message: 'Donnez le numéro de téléphone!',
                },
              ],
            })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('phone', e.target.value)}
                placeholder="Numéro de téléphone"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("Nom de l'entreprise", {
              initialValue: this.state.company,
              rules: [
                {
                  required: false,
                  message: 'Donnez le nom de votre entreprise!',
                },
              ],
            })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('company', e.target.value)}
                placeholder="Nom de l'entreprise"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("Taille de la l'entreprise", {
              initialValue: this.state.sizeCompany,
              rules: [
                {
                  required: false,
                  message: "Donnez la taille de votre l'entreprise!",
                },
              ],
            })(
              <Input
                style={{ backgroundColor: 'transparent' }}
                onChange={e => this.getValue('sizeCompany', e.target.value)}
                placeholder="Taille de la l'entreprise"
              />,
            )}
          </Form.Item>
          <FooterButtons
            disabled={
              this.state.sizeCompany.length === 0 ||
              this.state.company.length === 0 ||
              this.state.phone.length === 0 ||
              this.state.email.length === 0 ||
              this.state.lastName.length === 0 ||
              this.state.firstName.length === 0
            }
            prevComponent={() => this.PrevComp(6)}
            validate={() => {
              const postData = this.state
              postData.skills = postData.skills.map(skill => [
                skill.name,
                skill.level,
              ])
              if (
                postData.otherContract !== '' &&
                postData.typeContract === 'Autres'
              ) {
                postData.typeContract = postData.otherContract
              }
              if (
                postData.otherTypeDev !== '' &&
                postData.typeDev === 'Autres'
              ) {
                postData.typeDev = postData.otherTypeDev
              }
              postEntreprise(postData)
            }}
            step={this.state.step}
          />
        </Form>
      </div>
    )
    const LevelStudies = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel est le niveau d'études recherché ?
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
                <Radio style={radioStyle} value="Licence">
                  Licence
                  {this.state.levelStudies === 'Licence' ? (
                    <Input
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      style={{
                        width: '150%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Master">
                  Master
                  {this.state.levelStudies === 'Master' ? (
                    <Input
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      style={{
                        width: '150%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value=" Cycle d'ingénieurs">
                  Cycle d'ingénieurs
                  {this.state.levelStudies === " Cycle d'ingénieurs" ? (
                    <Input
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      style={{
                        width: '116%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Autodidacte">
                  Autodidacte
                  {this.state.levelStudies === 'Autodidacte' ? (
                    <Input
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      style={{
                        width: '150%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
                <Radio style={radioStyle} value="Autres">
                  Autres
                  {this.state.levelStudies === 'Autres' ? (
                    <Input
                      defaultValue={this.state.speciality}
                      onChange={e =>
                        this.getValue('speciality', e.target.value)
                      }
                      placeholder={holder}
                      style={{
                        width: '150%',
                        marginLeft: 10,
                        height: '30px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ) : null}
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>

          <FooterButtons
            prevComponent={() => this.PrevComp(2)}
            disabled={this.state.speciality.length === 0}
          />
        </Form>
      </div>
    )
    const Professional = () => (
      <div className="step">
        <div className="step-header" style={{ fontWeight: '400' }}>
          Quel est le niveau d'expérience professionnelle recherché ?
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('radio-group-four', {
              initialValue: this.state.yearExperience,
              rules: [{ required: false, message: 'Donnez le niveau' }],
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
            prevComponent={() => this.PrevComp(3)}
            disabled={this.state.yearExperience.length === 0}
          />
        </Form>
      </div>
    )
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    const checkStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    const { postEntreprise } = this.props
    return (
      <div>
        <div>
          <ConnectHeader />
          <div>
            <div className="entreprise-connect-response">
              <div className="progressbar">
                {this.state.step !== 8 ? (
                  <div style={{ width: `${this.state.width}%` }} />
                ) : null}
              </div>
              {this.state.step === 1 && Start()}
              {this.state.step === 2 && Technology()}
              {this.state.step === 3 && LevelStudies()}
              {this.state.step === 4 && Professional()}
              {this.state.step === 5 && Embauche()}
              {this.state.step === 6 && Contrat()}
              {this.state.step === 7 && Validation()}
              {this.state.step === 8 && <ConnectSuccess company="true" />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EntrepriseStart.propTypes = {}

export default Form.create({ name: 'EntrepriseStart' })(EntrepriseStart)
