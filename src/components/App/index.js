import React from 'react'
import './style.scss'
import zafClient from '../../zafClient'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import Suggestion from '../Suggestion'
import { LG } from '@zendeskgarden/react-typography'
import { Dots } from '@zendeskgarden/react-loaders'
import { PALETTE } from '@zendeskgarden/react-theming'
import { Row, Col } from '@zendeskgarden/react-grid'
import { buildUrl } from './utility'
import { Alert, Title } from '@zendeskgarden/react-notifications'

const App = () => {
  const [suggestions, setSuggestions] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(async () => {
    zafClient.invoke('resize', { height: '320px' })

    const metadata = await zafClient.metadata()
    const context = await zafClient.context()
    const data = await zafClient.get('ticket.id')

    const platformUrl = metadata.settings["platformUrl"]
    const subdomain = context.account.subdomain

    const settings = {
      url: buildUrl(platformUrl, data['ticket.id'], subdomain, '{{setting.secretKey}}'),
      secure: true,
      type: 'GET',
      contentType: 'application/json',
      cors: false,
    }
    zafClient.request(settings).then((res) => {
      setSuggestions(res)
    }, (err) => {
      if (err.status === 401) {
        setError('You are not authorized to see suggestions! Please double check your API key.<br>For a demo use "datasphera-demo-key"')
      } else {
        setError('An unexpected error has occured! Please try again later.')
      }
    })
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        <LG style={{marginBottom: 10, marginTop: 10}}>Similar tickets:</LG>
        {!suggestions && !error && (
          <Row>
            <Col textAlign="center">
              <Dots size={32} color={PALETTE.blue[600]} />
            </Col>
          </Row>
        )}

        {error && (
          <Row>
            <Col>
              <Alert type="error">
                <Title>Error</Title>
                <div dangerouslySetInnerHTML={{ __html: error }} />
              </Alert>
            </Col>
          </Row>
        )}

        {suggestions && !error && suggestions.length === 0 && (
          <Row>
            <Col>
              <Alert type="info">
                <Title>No Suggestions</Title>
                No similar tickets have been found in your ticket log.
              </Alert>
            </Col>
          </Row>
        )}

        {suggestions && suggestions.length > 0 && !error && (
          suggestions.map((suggestion) => {
            return <Suggestion
              question={suggestion.question.text}
              questionId={suggestion.question.zendeskId}
              questionExacctlyId={suggestion.question.exacctlyId}
              questionTitle={suggestion.question.subject}
              customerName={suggestion.question.customerName}
              agentAvatar={suggestion.reply.agentPhoto}
              response={suggestion.reply.text}
            />
          })
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
