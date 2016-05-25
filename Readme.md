
# loo-slack

  send logs to slack with [loo](http://github.com/matthewmueller/loo).

## Installation

```js
npm install loo-slack
```

## Usage

```js
let Slack = require('loo-slack')
let log = require('loo')('app')
let Log = require('loo')

// SLACK_URL
//  • format:  SLACK_URL="WEBHOOK"
//  • example: SLACK_URL="https://hooks.slack.com/services/..."
let slack = Slack(process.env.SLACK_URL)

// stream all "app" logs to slack
log.pipe(slack)

// stream every error and fatal error to slack.
// this includes "app", but also any dependency
// that uses loo.
Log.pipe.error(slack)
Log.pipe.fatal(slack)
```

## License

MIT
