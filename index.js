const headers = [ 'heading', 'Header' ]

/* eslint-disable-next-line arrow-body-style */
const findValue = (node, value) => node.children.find((child) => {
  return child.value === value || child.raw === value
})

const find = findValue

module.exports = (section, target, source) => {
  const children = []

  let isClean = false
  let sectionLevel = 0

  for (const node of target.children) {
    if (sectionLevel) {
      if (!isClean) {
        if (isNaN(node.depth) || node.depth > sectionLevel) {
          continue
        }
        isClean = true
      }
    }

    children.push(node)

    if (!sectionLevel && headers.includes(node.type) && find(node, section)) {
      sectionLevel = node.depth

      source.children.forEach((node) => children.push(node))
    }
  }

  if (sectionLevel === 0) {
    throw new Error(`Section '${section}' Not Found in target`)
  }

  return { ...target, children }
}

module.exports.findValue = findValue
