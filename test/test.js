'use strict'

/**
 * Module Dependencies
 */

let environment = require('envobj')
let log = require('loo')('slack:logger')
let Slack = require('..')

/**
 * Environment
 */

let env = environment({
  SLACK_URL: String
})

/**
 * Test
 */

log.pipe(Slack(env.SLACK_URL, {
  icon_url: 'https://cldup.com/8KHsv7mkQW.png',
  username: 'Jackops'
}))

let i = 0
log.warn(String(i++))
setInterval(function() {
  log.warn(i++)
}, 1000)
