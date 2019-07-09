/**
 *
 * DeveloperValidation
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';

import './developer-validation.scss'

function DeveloperValidation() {
  return (
    <div className="developer-validation">
      <div className="step">
        <h1 className="apply_form-header text-left">
          Informations personnelles
        </h1>
        <h2 className="apply_form-subheader text-left">
          Informations personnelles Le matching du réseau de développeurs de
          CONNECT avec les top companies sebase sur vos informations remplies
          ici.
        </h2>
        <form name="validation" method="post" action="success.php">
          <div className="form-field">
            <input
              className="js-file-attachment"
              type="file"
              name="fileAttachment2[]"
            />
          </div>
          <div className="form-field">
            <input
              className="js-file-attachment-1"
              type="file"
              name="fileAttachment3[]"
            />
          </div>
          <div className="form-field">
            <select className="simple_select" name="pays">
              <option value="">Choisissez votre pays</option>
              <option value="tn">Tunisie</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="form-field">
            <input
              name="linkedin"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Insérez le lien de votre profil Linkedin"
              value=""
            />
          </div>

          <div className="form-field">
            <input
              name="github"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Insérez le lien de votre compte GitHub"
              value=""
            />
          </div>
          <div className="form-field">
            <input placeholder="Site personnel" name="site" value="" />
          </div>
        </form>
      </div>
    </div>
  )
}

DeveloperValidation.propTypes = {}

export default DeveloperValidation
