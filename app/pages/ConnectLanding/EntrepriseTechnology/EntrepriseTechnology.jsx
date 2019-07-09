/**
 *
 * EntrepriseTechnology
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Input } from 'antd'
import './entreprise-technology.scss'

function EntrepriseTechnology() {
  return (
    <div className="entreprise-technology">
      <div className="step">
        <div className="step-header">
          Quelles sont les technologies que votre futur candidat doit avoir ?
        </div>
        <Input placeholder="Technologies souhaitées (ex., React, Javascripts, jQuery, etc)" />
        {/* <form id="quiz-form" method="post" action="entreprise_contrat.php">
          >
          <div className="form-field">
            <div className="skills_selector">
              <div className="form-field">
                <div className="select has-focus">
                  type="text" placeholder="Domaines d'expertise souhaités (e.g.,
                  JavaScript, Ruby, etc.)" /> />
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="quiz_question-submit_trigger"
            tabIndex="-1"
            disabled=""
          />
          <div className="step-actions">
            <a
              className="button is-white has-chevron_left step-back"
              href="entreprise_technology.php"
            >
              Retour
            </a>
            <button className="step-submit button has-chevron" type="submit">
              Suivant
            </button>
          </div>
        </form> */}
      </div>
    </div>
  )
}

EntrepriseTechnology.propTypes = {}

export default EntrepriseTechnology
