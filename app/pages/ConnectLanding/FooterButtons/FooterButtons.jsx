/**
 *
 * FooterButtons
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './footer-buttons.scss'

function FooterButtons({
  nextComponent,
  prevComponent,
  step,
  validate,
  disabled,
}) {
  return (
    <div className="footer-buttons">
      <div className="step-actions">
        {step === 1 ? (
          <Link to="/">
            <button
            style={{backgroundColor:'transparent'}}
              className="button is-white has-chevron_left step-back"
              onClick={prevComponent}
              type="button"
            >
              Retour
            </button>
          </Link>
        ) : (
          <button
          style={{backgroundColor:'transparent'}}
            className="button is-white has-chevron_left step-back"
            onClick={prevComponent}
            type="button"
          >
            Retour
          </button>
        )}
        {step !== 7 && (
          <button
            className="step-submit button has-chevron"
            type="submit"
            htmlType="submit"
            onClick={nextComponent}
            disabled={disabled}
            style={{height:'51px'}}
          >
            <span style={{marginLeft:'-12px', paddingRight:'5px'}}>
            Suivant
            </span>
          </button>
        )}
        {step === 7 && (
          <button
            className="step-submit"
            type="submit"
            htmlType="submit"
            onClick={validate}
            disabled={disabled}
          >
            Valider
          </button>
        )}
      </div>
    </div>
  )
}

FooterButtons.propTypes = {}

export default FooterButtons
