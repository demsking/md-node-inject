# Markdown AST injection utility

[![npm](https://img.shields.io/npm/v/md-node-inject.svg)](https://www.npmjs.com/package/md-node-inject) [![Build status](https://gitlab.com/demsking/md-node-inject/badges/master/pipeline.svg)](https://gitlab.com/demsking/md-node-inject/pipelines) [![Test coverage](https://gitlab.com/demsking/md-node-inject/badges/master/coverage.svg)](https://gitlab.com/demsking/md-node-inject/pipelines)

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
