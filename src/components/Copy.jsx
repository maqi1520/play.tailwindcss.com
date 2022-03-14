import { useState, useImperativeHandle, forwardRef } from 'react'
import clsx from 'clsx'
import juice from 'juice/client'

function inlineCSS(html, css) {
  return juice.inlineContent(html, css, {
    inlinePseudoElements: true,
  })
}

export const copySafari = (text) => {
  // 获取 input
  let input = document.getElementById('copy-input')
  if (!input) {
    // input 不能用 CSS 隐藏，必须在页面内存在。
    input = document.createElement('input')
    input.id = 'copy-input'
    input.style.position = 'absolute'
    input.style.left = '-1000px'
    input.style.zIndex = '-1000'
    document.body.appendChild(input)
  }
  // 让 input 选中一个字符，无所谓那个字符
  input.value = 'NOTHING'
  input.setSelectionRange(0, 1)
  input.focus()

  // 复制触发
  document.addEventListener('copy', function copyCall(e) {
    e.preventDefault()
    e.clipboardData.setData('text/html', text)
    e.clipboardData.setData('text/plain', text)
    document.removeEventListener('copy', copyCall)
  })
  document.execCommand('copy')
}

export const CopyBtn = forwardRef(function (props, ref) {
  const [{ state, html, css }, setState] = useState({
    state: 'disabled',
    errorText: undefined,
    html: undefined,
    css: undefined,
  })

  useImperativeHandle(
    ref,
    () => ({
      set: ({ html, css }) => {
        setState((prev) => ({
          ...prev,
          html,
          css,
          state: 'idle',
        }))
      },
    }),
    []
  )

  const handleClick = () => {
    setState({ state: 'loading' })
    const inlineHtml = inlineCSS(html, css)
    copySafari(inlineHtml)

    setState({ state: 'copied' })
    setTimeout(() => {
      setState({ state: 'idle' })
    }, 1000)
  }
  return (
    <div className="hidden sm:flex items-center space-x-4 min-w-0">
      <button
        type="button"
        className={clsx(
          'relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3',
          {
            'bg-sky-500/40 text-white dark:bg-gray-800 dark:text-white/40':
              state === 'disabled',
            'cursor-auto':
              state === 'disabled' || state === 'copied' || state === 'loading',
            'hover:bg-sky-400':
              state !== 'disabled' && state !== 'copied' && state !== 'loading',
            'bg-sky-500 text-white': state === 'idle' || state === 'loading',
            'text-sky-500 shadow-copied dark:bg-sky-500/10': state === 'copied',
            'shadow-sm': state !== 'copied',
            'dark:shadow-none': state === 'disabled',
            'dark:shadow-highlight/20':
              state !== 'copied' && state !== 'disabled',
          }
        )}
        onClick={handleClick}
        disabled={
          state === 'copied' || state === 'disabled' || state === 'loading'
        }
      >
        {state === 'copyied' ? '复制成功' : '复制'}
      </button>
    </div>
  )
})
