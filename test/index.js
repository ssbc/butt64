/* eslint-disable camelcase */

const tape = require('tape')
const crypto = require('crypto')

tape('basic use', t => {
  const isCannonicalBase64 = require('../')()

  const b = Buffer.alloc(4)
  const b1 = b.slice(1)
  const b2 = b.slice(2)

  let allGood = true
  for (let i = 0; i < 1 << 16; i++) {
    b.writeUInt32BE(i, 0)

    const errors = []
    if (!isCannonicalBase64.test(b.toString('base64'))) errors.push(b.toString('base64') + ', ' + i + ' is cannonical base64')
    if (!isCannonicalBase64.test(b1.toString('base64'))) errors.push(b1.toString('base64') + ', ' + i + ' is cannonical base64')
    if (!isCannonicalBase64.test(b2.toString('base64'))) errors.push(b2.toString('base64') + ', ' + i + ' is cannonical base64')

    if (errors.length) {
      allGood = false
      errors.forEach(error => t.fail(error))
    }
  }
  t.true(allGood, 'buffers up to ' + (1 << 16) + ' behave correctly')

  allGood = true
  function assertConsistentWithToString (str) {
    // if this is the same as it would be pased as, it's cannonical
    const isCannonical = str === Buffer.from(str, 'base64').toString('base64')

    if (isCannonical !== isCannonicalBase64.test(str)) {
      allGood = false
      t.fail('problem with ' + str)
    }
  }
  for (let i = 0; i < 1000; i++) {
    const s = crypto.randomBytes(8).toString('base64')
    assertConsistentWithToString(s.substring(0, 6) + '==')
    assertConsistentWithToString(s.substring(0, 7) + '=')
    // this should always be cannonical
    assertConsistentWithToString(s.substring(0, 8))
  }
  t.true(allGood, 'random buffers behave correctly')

  t.end()
})

tape('opts: length', t => {
  const isCannonicalBase64_3 = require('../')('', '', 4)
  const isCannonicalBase64_2 = require('../')('', '', 3)
  const isCannonicalBase64_1 = require('../')('', '', 2)

  const b = Buffer.alloc(4)
  const b1 = b.slice(1)
  const b2 = b.slice(2)

  let allGood = true
  for (let i = 0; i < 1 << 16; i++) {
    b.writeUInt32BE(i, 0)

    const errors = []
    if (!isCannonicalBase64_3.test(b.toString('base64'))) errors.push(b.toString('base64') + ', ' + i + ' is cannonical 4 byte base64')
    if (!isCannonicalBase64_2.test(b1.toString('base64'))) errors.push(b1.toString('base64') + ', ' + i + ' is cannonical 3 byte base64')
    if (!isCannonicalBase64_1.test(b2.toString('base64'))) errors.push(b2.toString('base64') + ', ' + i + ' is cannonical 2 byte base64')

    if (errors.length) {
      allGood = false
      errors.forEach(error => t.fail(error))
    }
  }
  t.true(allGood, 'buffers up to ' + (1 << 16) + ' behave correctly')

  t.end()
})
