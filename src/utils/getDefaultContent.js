import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export async function getDefaultContent() {
  const html = `## heading
### 2323
`
  const css = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n'
  const config = `module.exports = {
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [],
}\n`

  let { css: compiledCss } = await postcss([
    tailwindcss({
      content: [{ raw: html }],
    }),
    autoprefixer(),
    cssnano(),
  ]).process(css, {
    from: undefined,
  })

  return {
    html,
    css,
    config,
    compiledCss,
  }
}
