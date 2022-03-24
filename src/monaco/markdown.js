import * as monaco from 'monaco-editor'
import { debounce } from 'debounce'

export const HTML_URI = 'file:///index.md'

export function setupMarkdownMode(content, onChange, worker, getEditor) {
  const disposables = []

  const model = monaco.editor.createModel(
    content || '',
    'markdown',
    monaco.Uri.parse(HTML_URI)
  )
  disposables.push(model)

  const updateDecorations = debounce(async () => {}, 100)

  disposables.push(
    model.onDidChangeContent(() => {
      onChange()
    })
  )

  return {
    getModel: () => model,
    updateDecorations,
    activate: () => {
      getEditor().setModel(model)
    },
    dispose() {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}
