/**
 *
 * EntrepriseContrat
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Radio, Input } from 'antd'
import './entreprise-contrat.scss'

class EntrepriseContrat extends React.Component {
  state = {
    value: 1,
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    return (
      <div className="entreprise-contrat">
        <div className="step">
          <div className="step-header">
            Choisissez le type d'embauche de votre futur développeurs parmi ces
          </div>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Freelance
            </Radio>
            <Radio style={radioStyle} value={2}>
              CDI
            </Radio>
            <Radio style={radioStyle} value={3}>
              CDD
            </Radio>
            <Radio style={radioStyle} value={4}>
              More...
              {this.state.value === 4 ? (
                <Input style={{ width: 100, marginLeft: 10 }} />
              ) : null}
            </Radio>
          </Radio.Group>
          {/* <form
                      id="entreprise"
                      action="entreprise_embauche.php"
                      method="post"
                    >
                      <div className="form-field">
                        <div className="form-group g-mb-10 text-left">
                          <label className="u-check g-pl-25">
                            <input
                              className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
                              name="contrat"
                              type="radio"
                              value="Freelance"
                            />
                            />
                            <div class="u-check-icon-font g-absolute-centered--y g-left-0">
                                                <i class="fa" data-check-icon="&#xf192" data-uncheck-icon="&#xf1db"></i>
                                            </div>
                            <span className="radio_selector-title">
                              Freelance
                            </span>
                          </label>
                          <span className="radio_selector-description g-pl-25">
                            Il s'agit d'exercer une activité professionnelle
                            avec la qualité de travailleur indépendant
                          </span>
                        </div>

                        <div className="form-group g-mb-10 text-left">
                          <label className="u-check g-pl-25">
                            <input
                              className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
                              name="contrat"
                              type="radio"
                              value="CDI"
                            />
                            <div class="u-check-icon-font g-absolute-centered--y g-left-0">
                                                <i class="fa" data-check-icon="&#xf192" data-uncheck-icon="&#xf1db"></i>
                                            </div>
                            <span className="radio_selector-title">CDI</span>
                          </label>
                          <span className="radio_selector-description g-pl-25">
                            Le contrat à durée indéterminée est la forme
                            normale... du contrat de travail.
                          </span>
                        </div>

                        <div className="form-group g-mb-10 text-left">
                          <label className="u-check g-pl-25">
                            <input
                              className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
                              name="contrat"
                              type="radio"
                              value="CDD"
                            />
                            <div class="u-check-icon-font g-absolute-centered--y g-left-0">
                                                <i class="fa" data-check-icon="&#xf192" data-uncheck-icon="&#xf1db"></i>
                                            </div>
                            <span className="radio_selector-title">CDD</span>
                          </label>
                          <span className="radio_selector-description g-pl-25">
                            Contrairement au CDI, le CDD intègre une date de
                            fin, ou tout du moins un terme.
                          </span>
                        </div>

                        <div className="form-group g-mb-10 g-mb-0--md text-left">
                          <label className="u-check g-pl-25">
                            <input
                              className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0"
                              name="contrat"
                              type="radio"
                              value="Autres"
                            />
                            />
                            <div class="u-check-icon-font g-absolute-centered--y g-left-0">
                                                <i class="fa" data-check-icon="&#xf192" data-uncheck-icon="&#xf1db"></i>
                                            </div>
                            <span className="radio_selector-title">Autres</span>
                          </label>
                          <span className="radio_selector-description g-pl-25">
                            Tous types de contrat différent aux contrats
                            courants.
                          </span>
                        </div>
                      </div>
                      <div className="step-actions">
                        <a
                          className="button is-white has-chevron_left step-back"
                          href="entreprise_technology.php"
                        >
                          Retour
                        </a>
                        <button
                          className="step-submit button has-chevron"
                          type="submit"
                          disabled
                        >
                          Suivant
                        </button>
                      </div>
                    </form> */}
        </div>
      </div>
    )
  }
}

EntrepriseContrat.propTypes = {}

export default EntrepriseContrat
