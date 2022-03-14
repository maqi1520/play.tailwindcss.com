import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

function CodeBlock(props) {
  const { children, className = 'language-js' } = props.children.props
  // e.g. "language-js"

  const language = className.substring(9)
  return (
    <pre>
      <Highlight {...defaultProps} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <code className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        )}
      </Highlight>
    </pre>
  )
}

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock
