import React, { memo } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { Input, Select, Button } from 'antd'
import PropTypes from 'prop-types'
import _, { isEmpty } from 'lodash'
import AceEditor from 'react-ace'
import {
  LANGUAGES,
  JAVASCRIPT,
} from 'shared/redux/editor/utils/editorConstants'
import messages from './messages'
import 'brace/mode/jsx'

import 'brace/mode/javascript'
import 'brace/snippets/javascript'

import 'brace/mode/java'
import 'brace/snippets/java'

import 'brace/mode/python'
import 'brace/snippets/python'

import 'brace/mode/ruby'
import 'brace/snippets/ruby'

import 'brace/mode/csharp'
import 'brace/snippets/csharp'

import 'brace/mode/elixir'
import 'brace/snippets/elixir'

import 'brace/ext/language_tools'
import 'brace/ext/searchbox'
import 'brace/theme/monokai'
import './code-compiling.scss'
import TestCase from '../TestCase'

const CodeCompiling = ({
  assessment,
  skill,
  updateCodeCompilingQuestion,
  updateCodeCompilingLanguage,
  updateCodeCompilingSolution,
  updateCodeCompilingPlaceholder,
  updateCodeCompilingAddUseCase,
  updateCodeCompilingDeleteUseCase,
  updateCodeCompilingUpdateUseCase,
  intl,
}) => {
  const placeholders = {
    questionPlaceholder: intl.formatMessage({
      ...messages.questionPlaceholder,
    }),
  }

  return (
    <div className="code-compiling">
      <div className="assessment-title">
        <FormattedMessage {...messages.codeCompiling} />
      </div>
      <div className="code-compiling-content">
        <div className="code-compiling-statement">
          <div className="label">
            <FormattedMessage {...messages.question} />
          </div>
          <Input
            placeholder={placeholders.questionPlaceholder}
            value={skill.data[assessment.questionId].text}
            onChange={e =>
              updateCodeCompilingQuestion(assessment.questionId, e.target.value)
            }
          />
        </div>
        <div className="editor-languages">
          <div className="label">
            <FormattedMessage {...messages.language} />
          </div>

          <Select
            value={
              isEmpty(skill.data[assessment.languageId].text)
                ? LANGUAGES[JAVASCRIPT].key
                : skill.data[assessment.languageId].text
            }
            onChange={e =>
              updateCodeCompilingLanguage(assessment.languageId, e)
            }
          >
            {Object.keys(LANGUAGES).map(langId => (
              <Select.Option value={LANGUAGES[langId].key}>
                {LANGUAGES[langId].label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="solution-editor">
          <span className="label">
            <FormattedMessage {...messages.solution} />
          </span>
          <AceEditor
            width="100"
            height="200px"
            className="editor"
            placeholder={
              isEmpty(skill.data[assessment.languageId].text)
                ? LANGUAGES[JAVASCRIPT].label
                : LANGUAGES[skill.data[assessment.languageId].text].label
            }
            mode={
              isEmpty(skill.data[assessment.languageId].text)
                ? LANGUAGES[JAVASCRIPT].label
                : LANGUAGES[skill.data[assessment.languageId].text].label
            }
            theme="monokai"
            onChange={e =>
              updateCodeCompilingSolution(assessment.solutionId, e)
            }
            value={skill.data[assessment.solutionId].text}
            fontSize={14}
          />
        </div>
        <div className="placeholder-editor">
          <span className="label">
            <FormattedMessage {...messages.placeholder} />
          </span>
          <AceEditor
            width="100"
            height="200px"
            className="editor"
            placeholder={
              isEmpty(skill.data[assessment.languageId].text)
                ? LANGUAGES[JAVASCRIPT].label
                : LANGUAGES[skill.data[assessment.languageId].text].label
            }
            mode={
              isEmpty(skill.data[assessment.languageId].text)
                ? LANGUAGES[JAVASCRIPT].label
                : LANGUAGES[skill.data[assessment.languageId].text].label
            }
            theme="monokai"
            onChange={e =>
              updateCodeCompilingPlaceholder(assessment.placeholderId, e)
            }
            value={skill.data[assessment.placeholderId].text}
            fontSize={14}
          />
        </div>
        <div className="input-output-cases-container">
          <div className="label-row">
            <span className="label">
              <FormattedMessage {...messages.input} />
            </span>
            <span className="label">
              <FormattedMessage {...messages.output} />
            </span>
          </div>
          {assessment.testCases.map(el => (
            <TestCase
              el={el}
              key={el.id}
              assessment={assessment}
              skill={skill}
              updateCodeCompilingSolution={updateCodeCompilingSolution}
              updateCodeCompilingUpdateUseCase={
                updateCodeCompilingUpdateUseCase
              }
              updateCodeCompilingDeleteUseCase={
                updateCodeCompilingDeleteUseCase
              }
              updateCodeCompilingAddUseCase={updateCodeCompilingAddUseCase}
            />
          ))}
          <Button
            onClick={() => {
              updateCodeCompilingAddUseCase(assessment.id)
            }}
          >
            <FormattedMessage {...messages.addTestCase} />
          </Button>
        </div>
      </div>
    </div>
  )
}

CodeCompiling.propTypes = {
  assessment: PropTypes.object.isRequired,
  updateCodeCompilingQuestion: PropTypes.func.isRequired,
  updateCodeCompilingLanguage: PropTypes.func.isRequired,
  updateCodeCompilingSolution: PropTypes.func.isRequired,
  updateCodeCompilingPlaceholder: PropTypes.func.isRequired,
  updateCodeCompilingAddUseCase: PropTypes.func.isRequired,
  updateCodeCompilingDeleteUseCase: PropTypes.func.isRequired,
  updateCodeCompilingUpdateUseCase: PropTypes.func.isRequired,
  skill: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  intl: intlShape.isRequired,
}

export default memo(injectIntl(CodeCompiling))
