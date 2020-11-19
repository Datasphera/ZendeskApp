# Exacctly Advise Zendesk App
## Description
This app provides ticket reply suggestions retrieved from similar cases in the ticket history.For each incoming ticket, Exacctly suggests multiple answers inferred from semantically similar conversations in the ticket index. Exacctly enables support agents to be more productive as they can effortlessly leverage the team knowledge base.By authorizing Exacctly Platform to your Zendesk account, you can get the full set of Exacctly features including Cold-start AI-Driven ticket tagging and routing.

## Project tree
    src/components/App/index.js              - Main component for Exacctly Advise Zendesk app
    src/components/App/utility.js            - Utility functions for the main component
    src/components/App/style.scss            - SCSS for the main component
    src/components/Suggestion/index.js       - Suggestion box component for Exacctly Advise Zendesk app
    src/components/Suggestion/style.scss     - SCSS for the suggestion component
    src/global.scss                          - Shared SCSS for all the components
    src/__test__/index.test.js               - Unit tests
    dist/manifest.json                       - Configuration file for app, also used by Zendesk
    dist/assets                              - Contains exacctly icons, required by Zendesk
    
## Commands
#### npm run build

This command can be used to build to build the application to the `dist/` folder using the production env.

#### npm run build-dev

This command can be used to build to build the application to the `dist/` folder using the development env.

#### npm run dev

This command watches for file changes and when a file is changed builds to the `dist/` folder using the development env.

#### npm run package

This command packages the `dist/` folder for upload to Zendesk in a `.zip` file.
Note you must run `npm run build` at least once before using this command.

#### npm run build:package

This command uses npm-run-all to run both the `npm run build` and the `npm run package` command with one command.

#### npm run serve

This command uses [ZAT](https://developer.zendesk.com/apps/docs/developer-guide/zat) to serve the content to your Zendesk directly from your computer

Read more about ZAT Here: <https://developer.zendesk.com/apps/docs/developer-guide/zat>

#### npm run clean

This command uses rimraf to remove the last `.zip` from the `dist/` folder.

#### npm run test

This command uses Jest to run tests. All tests are placed in the `src/__tests__` folder.


## How to install
- Exacctly Zendesk integration requires both an Exacctly and a Zendesk account. To test out the integration in your Zendesk environment, you should create an account on Exacctly platform at app.exacctly.com and link your Exacctly account to your Zendesk account.
- Log in to your Zendesk account and install the Exacctly App from the Marketplace. Fill in the configuration form with the information you received after creating your Exacctly account.
- Whenever you are viewing a Zendesk ticket, you can access Exacctly app from the Apps pane on the right side of the screen.
- The Exacctly app will display similar tickets that you have previously received, along with their suggested responses. Pick the most suitable response and its content will be copied to your clipboard!

## Includes

* React
* Webpack
* Babel
* SASS compiler
* CSS modules
* Jest
* zafClient

## References
Based on the boilerplate at <https://github.com/Cloudhuset/Zendesk-React-App-Boilerplate>

License: APACHE2
