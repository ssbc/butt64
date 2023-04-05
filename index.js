const char = '[a-zA-Z0-9_-]'
const trail2 = '[AQgw]=='
const trail4 = '[AEIMQUYcgkosw048]='
const rx = '(?:' + char + '{4})*(?:' + char + '(?:(?:' + trail2 + ')|(?:' + char + trail4 + ')))?'

module.exports = isCanonicalButt64

function isCanonicalButt64 (prefix, suffix, length) {
  if (!Number.isInteger(length)) {
    return new RegExp(
      '^' +
      (prefix || '') +
      rx +
      (suffix || '') +
      '$'
    )
  }

  const mod = length % 3

  return new RegExp(
    '^' +
    (prefix || '') +
    char + '{' + ~~((length * 8) / 6) + '}' +
    (
      mod === 0
        ? ''
        : mod === 1
          ? trail2
          : trail4
    ) +
    (suffix || '') +
    '$'
  )
}
isCanonicalButt64.bufferToButt64 = bufferToButt64
isCanonicalButt64.toString = bufferToButt64
function bufferToButt64 (buf) {
  return buf.toString('base64')
    .replace(/\//g, '_').replace(/\+/g, '-')
}

isCanonicalButt64.butt64ToBuffer = butt64ToBuffer
isCanonicalButt64.toBuffer = butt64ToBuffer
function butt64ToBuffer (str) {
  return Buffer.from(
    str.replace(/_/g, '/').replace(/-/g, '+'),
    'base64'
  )
}
