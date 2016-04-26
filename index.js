'use strict'

/**
 * Module Dependencies
 */

let Send = require('send-to-slack')
let through = require('through2')

/**
 * Export `Slack`
 */

module.exports = Slack

/**
 * Export `Slack`
 *
 * @param {String} url
 * @return {Stream}
 */

function Slack (url, options) {
  let send = Send(url)(options)

  return through.obj(function (chunk, enc, fn) {
    send.apply(null, format(chunk))
    fn(null, chunk)
  })
}

/**
 * Format the log
 *
 * @param {Object} log
 * @return {Array}
 */

function format (log) {
  let fields = log.fields || {}
  let emoji = level_to_emoji(log.level)
  let message = `${emoji} ${log.message}`

  if (log.err) {
    message += `\n\`\`\`\n${log.err.stack}\`\`\`\n`
  }

  return [message, fields]
}

/**
 * Level to Emoji
 */

function level_to_emoji (level) {
  switch (level) {
    case 'fatal': return ':skull_and_crossbones:'
    case 'error': return ':x:'
    case 'warning': return ':warning:'
    case 'info': return ':bulb:'
    case 'debug': return ':mag_right:'
    case 'trace': return ':waving_white_flag:'
  }
}
