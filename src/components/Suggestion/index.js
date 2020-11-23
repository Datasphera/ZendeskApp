import React from 'react'
import './style.scss'
import { PALETTE } from '@zendeskgarden/react-theming'
import { Avatar } from '@zendeskgarden/react-avatars'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { Ellipsis, Paragraph } from '@zendeskgarden/react-typography'
import { Anchor } from '@zendeskgarden/react-buttons'
import { Row, Col } from '@zendeskgarden/react-grid'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import zafClient from '../../zafClient'

const Suggestion = (props) => {
  const [expandQuestion, setExpandQuestion] = React.useState(false)
  const [expandAnswer, setExpandAnswer] = React.useState(false)

  const getInitials = function (string) {
    let names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase()

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
  }

  return (
    <div className="suggestion shadow-dreamy">
      <div className="question-section">
        <div className="ticket-header">
          <div className="avatar">
            <Avatar backgroundColor={PALETTE.blue[400]}
              size="small">
              <Avatar.Text>{getInitials(props.customerName)}</Avatar.Text>
            </Avatar>
          </div>
          <div className="ticket-name"><b><Anchor onClick={() => zafClient.invoke('routeTo', 'ticket', props.questionId)}>#{props.questionId} - {props.questionTitle}</Anchor></b></div>
        </div>
        <div className="ticket-body">
          <Row><Col>
            {!expandQuestion && (
              <Ellipsis onClick={() => setExpandQuestion(true)}>{props.question}</Ellipsis>
            )}
            {expandQuestion && (
              <Paragraph onClick={() => setExpandQuestion(false)}>{props.question}</Paragraph>
            )}
          </Col></Row>
        </div>
      </div>
      <div className="answer-section">
        <div className="ticket-header">
          <Tooltip
            content="Copy reply to clipboard"
            placement="top-start"
            size="small">
            <div>
              <CopyToClipboard text={props.response}>
                <i className="far fa-clipboard clipboard-icon push-right" />
              </CopyToClipboard>
            </div>
          </Tooltip>
          <div className="suggested-answer"><b><Anchor>Suggested reply</Anchor></b></div>
          <div className="avatar">
            <Avatar size="small">
              <img src={props.agentAvatar} alt="" />
            </Avatar>
          </div>
        </div>
        <div className="ticket-body">
          <Row><Col>
            {!expandAnswer && (
              <Ellipsis onClick={() => setExpandAnswer(true)}>{props.response}</Ellipsis>
            )}
            {expandAnswer && (
              <Paragraph onClick={() => setExpandAnswer(false)}>{props.response}</Paragraph>
            )}
          </Col></Row>
          <Row style={{marginTop: 10}}><Col><Anchor isExternal href={"https://app.exacctly.com/conversations/" + props.questionExacctlyId}>View on Exacctly</Anchor></Col></Row>
          <Row><Col><Anchor onClick={() => zafClient.invoke('routeTo', 'ticket', props.questionId)}>View on Zendesk</Anchor></Col></Row>
        </div>
      </div>
    </div>)
}

export default Suggestion