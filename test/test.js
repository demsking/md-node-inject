'use strict'

const assert = require('assert')
const inject = require('..')

/* global describe it */

describe('transform', () => {
  const newHeaderNode = {
    'type': 'Header',
    'depth': 3,
    'children': [
      {
        'type': 'Str',
        'value': 'NEW_HEADER',
        'raw': 'NEW_HEADER'
      }
    ],
    'raw': '### NEW_HEADER '
  }
  const newParagraphNode = {
    'type': 'Str',
    'value': 'NEW_PARAGRAPTH',
    'raw': 'NEW_PARAGRAPTH'
  }

  it('should failed to inject with a not found section', () => {
    const section = 'API'
    const target = { children: [] }
    const source = { children: [{
      type: 'Header', value: 'Hello H1', children: [] }]}

    assert.throws(() => inject(section, target, source), /Not Found/)
  })

  it('should successfully inject with an empty source at last', () => {
    const section = 'methods'
    const target = require('./tree.empty.source.last')
    const source = { children: [] }
    const expected = require('./tree.empty.source.last.expected')
    const doc = inject(section, target, source)

    assert.deepEqual(doc, expected)
  })

  it('should successfully inject with an empty source from middle', () => {
    const section = 'methods'
    const target = require('./tree.empty.source.middle')
    const source = { children: [] }
    const expected = require('./tree.empty.source.middle.expected')
    const doc = inject(section, target, source)

    assert.deepEqual(doc, expected)
  })

  it('should successfully inject with an existing section', () => {
    const section = 'methods'
    const target = require('./tree.multiple.section')
    const source = { children: [ newHeaderNode, newParagraphNode ] }

    const doc = inject(section, target, source)
    const indexNode = doc.children.findIndex((node) => {
      return node.type === 'Header' && inject.findValue(node, 'NEW_HEADER')
    })

    assert.notEqual(indexNode, -1)

    const nodeHeader = doc.children[indexNode]
    const nodeParagraph = doc.children[indexNode + 1]

    assert.deepEqual(nodeHeader, newHeaderNode)
    assert.deepEqual(nodeParagraph, newParagraphNode)
  })
})
