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

log.info('hi there!', { team: 'martha stewart' })
log.error(new Error('wtf!'))
