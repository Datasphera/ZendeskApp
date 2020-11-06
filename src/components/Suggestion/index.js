import React from 'react'
import './style.scss'
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { TooltipModal } from '@zendeskgarden/react-modals';
import { Span, LG } from '@zendeskgarden/react-typography';
import { Button, Anchor } from '@zendeskgarden/react-buttons';
import { Row } from '@zendeskgarden/react-grid';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import zafClient from '../../zafClient'

const Suggestion = (props) => {
  const replyRef = React.useRef(null);
  const questionRef = React.useRef(null);
  const [questionReferenceElement, setQuestionReferenceElement] = React.useState(null);
  const [replyReferenceElement, setReplyReferenceElement] = React.useState(null);

  var getInitials = function (string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

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
        <div className="ticket-body" ref={questionRef}          
              onClick={() => setQuestionReferenceElement(questionRef.current)}>
          <HTMLEllipsis
            unsafeHTML={props.question}
            maxLine='2'
            ellipsisHTML='<a><i>... read more</i></a>'
            basedOn='words'
          />
          <TooltipModal
            referenceElement={questionReferenceElement}
            onClose={() => setQuestionReferenceElement(null)}
            placement="bottom"
            style={{ width: '98%' }}>
            <TooltipModal.Title>#{props.questionId} - {props.questionTitle}</TooltipModal.Title>
            <TooltipModal.Body>
              <Row>
                {props.question}
              </Row>
              <Row>
                <Anchor isExternal href={"https://app.exacctly.com/conversations/" + props.questionExacctlyId}>View on Exacctly</Anchor>
              </Row>
            </TooltipModal.Body>
            <TooltipModal.Footer>
              <Button
                size="small"
                onClick={() => zafClient.invoke('routeTo', 'ticket', props.questionId)}
                isPrimary>
                Go to Zendesk
                </Button>
            </TooltipModal.Footer>
            <TooltipModal.Close aria-label="Close" />
          </TooltipModal>
        </div>
      </div>
      <div className="answer-section">
        <div className="ticket-header">
          <Tooltip
            content="Copy reply to clipboard"
            placement="top-start"
            size="small">
            <CopyToClipboard text={props.response}>
              <i className="far fa-clipboard clipboard-icon push-right"></i>
            </CopyToClipboard>  
          </Tooltip>
          <div className="suggested-answer"><b><Anchor>Suggested reply</Anchor></b></div>
          <div className="avatar">
            <Avatar size="small">
              <img src={props.agentAvatar} alt="" />
            </Avatar>
          </div>
        </div>
        <div className="ticket-body" ref={replyRef}          
              onClick={() => setReplyReferenceElement(replyRef.current)}>
          <HTMLEllipsis
            unsafeHTML={props.response}
            maxLine='2'
            ellipsisHTML='<a><i>... read more</i></a>'
            basedOn='words'
          />
          <TooltipModal
            referenceElement={replyReferenceElement}
            onClose={() => setReplyReferenceElement(null)}
            placement="bottom"
            style={{ width: '98%' }}>
            <TooltipModal.Title>Suggested reply</TooltipModal.Title>
            <TooltipModal.Body>
              <Row>
                {props.response}
              </Row>
              <Row>
                <Anchor isExternal href={"https://app.exacctly.com/conversations/" + props.questionExacctlyId}>View on Exacctly</Anchor>
              </Row>
            </TooltipModal.Body>
            <TooltipModal.Footer>
              <LG style={{ flexGrow: 1 }}>
                <Span hue="grey"><i className="far fa-clipboard clipboard-icon push-right"></i></Span>
              </LG>
              <Button
                size="small"
                onClick={() => zafClient.invoke('routeTo', 'ticket', props.questionId)}
                isPrimary>
                Go to Zendesk
                </Button>
            </TooltipModal.Footer>
            <TooltipModal.Close aria-label="Close" />
          </TooltipModal>
        </div>
      </div>
    </div>)
}

export default Suggestion;