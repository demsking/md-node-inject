'use strict'

const headers = ['heading', 'Header']
const findValue = (node, value) => node.children.find((child) => {
  return child.value === value || child.raw === value
})

module.exports = (section, target, source) => {
  const children = []

  let isClean = false
  let sectionLevel = 0

  for (let node of target.children) {
    if (sectionLevel) {
      if (!isClean) {
        if (isNaN(node.depth) || node.depth > sectionLevel) {
          continue
        }
        isClean = true
      }
    }

    children.push(node)

    if (!sectionLevel && headers.indexOf(node.type) !== -1 && findValue(node, section)) {
      sectionLevel = node.depth

      source.children.forEach((node) => children.push(node))
    }
  }

  if (sectionLevel === 0) {
    throw new Error(`Section '${section}' Not Found in target`)
  }

  return Object.assign({}, target, { children })
}

module.exports.findValue = findValue
