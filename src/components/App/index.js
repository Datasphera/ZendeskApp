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

const App = () => {
  const [suggestions, setSuggestions] = React.useState(null)

  React.useEffect(async () => {
    zafClient.invoke('resize', { height: '320px' })

    const metadata = await zafClient.metadata()
    const context = await zafClient.context()
    const data = await zafClient.get('ticket.id')

    const platformUrl = metadata.settings["platformUrl"]
    const secretKey = metadata.settings["secretKey"]
    const subdomain = context.account.subdomain

    const settings = {
      url: buildUrl(platformUrl, data['ticket.id'], subdomain, secretKey),
      type: 'GET',
      contentType: 'application/json',
    }
    zafClient.request(settings).then((res) => {
      setSuggestions(res)
    })
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        <LG style={{marginBottom: 10, marginTop: 10}}>Similar tickets:</LG>
        {!suggestions && (
          <Row>
            <Col textAlign="center">
              <Dots size={32} color={PALETTE.blue[600]} />
            </Col>
          </Row>
        )}

        {suggestions && suggestions.length > 0 && (
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
