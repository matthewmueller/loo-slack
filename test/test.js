'use strict'

/**
 * Module Dependencies
 */

let environment = require('envobj')
let log = require('sutra')('slack:logger')
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
log.info(i++)
setInterval(function() {
  console.log('logging', i)
  log.info(i++)
}, 60000)
