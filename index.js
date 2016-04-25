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

  return through(function (chunk, enc, fn) {
    fn(null, chunk)

    let lines = chunk.length ? chunk.toString().split('\n') : ['']
    for (let i = 0, line; line = lines[i]; i++) {
      if ((lines[i].length === 0) && (i == lines.length - 1)) break
      let log = JSON.parse(line)
      send.apply(null, format(log))
    }
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
    case 'info': return ':pushpin:'
    case 'debug': return ':mag_right:'
    case 'trace': return ':waving_white_flag:'
  }
}
