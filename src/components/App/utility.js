export function buildUrl(platformUrl, ticketId, subdomain, key) {
  return `${platformUrl}/suggest/zendesk/${ticketId}?subdomain=${subdomain}&key=${key}`
}