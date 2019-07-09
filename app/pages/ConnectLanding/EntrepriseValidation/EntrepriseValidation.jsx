/**
 *
 * EntrepriseValidation
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import ConnectHeader from '../ConnectHeader'
import './entreprise-validation.scss'
import ConnectPartners from '../ConnectPartners'

function EntrepriseValidation() {
  return (
    <div className="entreprise-validation">
      <div className="step">
        <div className="step-header">
          Votre demande a bien été enregistrée. Entrez vos informations pour
          informations pour recevoir les meilleurs profils.
        </div>
        <form name="validation" method="post" action="success.php">
          <div className="form-field">
            <input
              name="fullNme"
              id="fullNme"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Nom & prénom"
              value=""
            />
          </div>
          <div className="form-field">
            <input
              name="email"
              type="email"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="E-mail"
              value=""
            />
          </div>
          <div className="form-field">
            <input
              name="company_name"
              type="text"
              autoComplete="organization"
              autoCapitalize="none"
              placeholder="Nom de la compagnie"
              value=""
            />
          </div>

          <div className="form-field">
            <select className="simple_select" name="size">
              <option value="">Taille de la compagnie</option>
              <option value="Moins de 10">Moins de 10</option>
              <option value="11 - 50">11 - 50</option>
              <option value="51 - 200">51 - 200</option>
              <option value="201 - 1000">201 - 1000</option>
              <option value="Plus de 1000">Plus de 1000</option>
            </select>
          </div>
          <div className="form-field">
            <div className="phone_input">
              <div className="phone_input-code">
                <div className="select">
                  <input
                    type="text"
                    placeholder="Country name"
                    tabIndex="-1"
                    value=""
                  />
                </div>
                <div
                  className="phone_input-code_overlay"
                  // style='background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0YwRjBGMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjAlIiB4Mj0iNTAlIiB5Mj0iMTAwJSIgaWQ9ImIiPjxzdG9wIHN0b3AtY29sb3I9IiNFOTI0MzQiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRTExMzI0IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InVybCgjYSkiIGQ9Ik0wIDBoMjF2MTVIMHoiLz48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDIxdjE1SDB6Ii8+PHBhdGggZD0iTTExLjg1OCA0LjI3M2EzLjUgMy41IDAgMSAwIDAgNi40NTMgMy4yNSAzLjI1IDAgMCAxIDAtNi40NTN6TTEwLjUgMTJhNC41IDQuNSAwIDEgMSAwLTkgNC41IDQuNSAwIDAgMSAwIDl6bTEuNzY2LTMuNjIybDEuMzUyLjUwNS0uNzc1LTEuMjE4Ljg5OC0xLjEzLTEuMzk4LjM2MS0uNzk3LTEuMjA0LS4wODggMS40NDEtMS4zOTEuMzg2IDEuMzQzLjUzLS4wNjMgMS40NDIuOTE5LTEuMTEzeiIgZmlsbD0idXJsKCNhKSIvPjwvZz48L3N2Zz4=");'
                />
              </div>
              <div className="phone_input-number">
                <input type="tel" placeholder="71 473 374" value="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

EntrepriseValidation.propTypes = {}

export default EntrepriseValidation
