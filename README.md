# Markdown AST injection utility

[![Build Status](https://travis-ci.org/demsking/md-node-inject.svg?branch=master)](https://travis-ci.org/demsking/md-node-inject) [![Known Vulnerabilities](https://snyk.io/test/github/demsking/md-node-inject/badge.svg)](https://snyk.io/test/github/demsking/md-node-inject) [![Coverage Status](https://coveralls.io/repos/github/demsking/md-node-inject/badge.svg?branch=master)](https://coveralls.io/github/demsking/md-node-inject?branch=master)

## Install

```sh
npm install --save md-node-inject
```

## Usage

```javascript
const ast = require('markdown-to-ast')
const inject = require('md-node-inject')
const toMarkdown = require('ast-to-markdown')

const mdContent = `
  # Sample
  Description

  # API

  # License
  MIT
`
const mdApiContent = `
  ## method()
  Method description
`

const mdContentAst = ast.parse(mdContent)
const mdApiContentAst = ast.parse(mdApiContent)

const injectionSection = 'API'
const mergedContentAst = inject(injectionSection, mdContentAst, mdApiContentAst)

const mergedContent = toMarkdown(mergedContentAst)

console.log(mergedContent)
```
Output:
```markdown
# Sample
Description

# API
## method()
Method description

# License
MIT
```

## License

Under the MIT license. See [LICENSE](https://gitlab.com/demsking/md-node-inject/blob/master/LICENSE) file for more details.
