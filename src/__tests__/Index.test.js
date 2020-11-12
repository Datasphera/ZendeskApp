const buildUrl = require('../components/App/utility');

describe('buildUrl function', () => {
  it('should build the endpoint URL', () => {
    const url = 'https://app.exacctly.com';
    const ticketId = 123;
    const key = 'datasphera-demo-key';
    const subdomain = 'datasphera';
    const output = 'https://app.exacctly.com/suggest/zendesk/123?subdomain=datasphera&key=datasphera-demo-key';
    expect(buildUrl(url, ticketId, key)).toEqual(output);
  })
})