/**
 *
 * SkillNetworkTitle
 *
 */

import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Col, PageHeader, Button } from 'antd'
import PropTypes from 'prop-types'

import { isContentArchitect } from 'shared/utils/access-token'
import { FormattedMessage } from 'react-intl'
import routes from 'shared/routes'
import messages from './messages'
import './skill-network-title.scss'

function SkillNetworkTitle({ onNewCreation, role }) {
  return (
    <div className="skill-network-title">
      <Col span={5}>
        <PageHeader
          onBack={() => {
            window.history.back()
          }}
          title={<FormattedMessage {...messages.title} />}
        />
      </Col>
      {isContentArchitect(role) && (
        <Col offset={16} span={3}>
          <div className="creation-buttons">
            <Button
              className="creation"
              onClick={() => onNewCreation()}
              type="button"
            >
              <div>
                <span>
                  <FormattedMessage {...messages.creation} />
                </span>
              </div>
            </Button>
            <Link to={routes.TREE.path}>
              <Button className="creation" type="button">
                <div>
                  <span>
                    <FormattedMessage {...messages.treeCreation} />
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        </Col>
      )}
    </div>
  )
}

SkillNetworkTitle.propTypes = {
  onNewCreation: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
}

export default memo(SkillNetworkTitle)
