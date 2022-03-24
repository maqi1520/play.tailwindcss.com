import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

export default function remarkTocHeadings(options) {
  return (tree) =>
    visit(tree, 'heading', (node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        depth: node.depth,
      })
      console.log(options.exportRef)
    })
}

var a = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'ul',
      properties: {},
      children: [
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'a',
              position: {
                start: {
                  line: 1,
                  column: 3,
                  offset: 2,
                },
                end: {
                  line: 1,
                  column: 4,
                  offset: 3,
                },
              },
            },
          ],
          position: {
            start: {
              line: 1,
              column: 1,
              offset: 0,
            },
            end: {
              line: 1,
              column: 4,
              offset: 3,
            },
          },
        },
        {
          type: 'text',
          value: '\n',
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value: 'a',
              position: {
                start: {
                  line: 2,
                  column: 3,
                  offset: 6,
                },
                end: {
                  line: 2,
                  column: 4,
                  offset: 7,
                },
              },
            },
          ],
          position: {
            start: {
              line: 2,
              column: 1,
              offset: 4,
            },
            end: {
              line: 2,
              column: 4,
              offset: 7,
            },
          },
        },
        {
          type: 'text',
          value: '\n',
        },
      ],
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 3,
          column: 3,
          offset: 10,
        },
      },
    },
    {
      type: 'text',
      value: '\n',
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value: 'Hello, world!',
          position: {
            start: {
              line: 4,
              column: 1,
              offset: 11,
            },
            end: {
              line: 4,
              column: 14,
              offset: 24,
            },
          },
        },
      ],
      position: {
        start: {
          line: 4,
          column: 1,
          offset: 11,
        },
        end: {
          line: 4,
          column: 14,
          offset: 24,
        },
      },
    },
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0,
    },
    end: {
      line: 4,
      column: 14,
      offset: 24,
    },
  },
}
