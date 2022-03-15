import { useState, useRef, useEffect, useCallback } from 'react'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import ReactDOMServer from 'react-dom/server'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'
import Worker from 'worker-loader!../workers/postcss.worker.js'
import { requestResponse } from '../utils/workers'
import { debounce } from 'debounce'
import { Editor } from './Editor'
import SplitPane from 'react-split-pane'
import useMedia from 'react-use/lib/useMedia'
import { validateJavaScript } from '../utils/validateJavaScript'

import { useDebouncedState } from '../hooks/useDebouncedState'
import { Preview } from './Preview'
import { ErrorOverlay } from './ErrorOverlay'
import Router from 'next/router'
import { Header } from './Header'
import { Share } from './Share'
import { CopyBtn } from './Copy'
import { TabBar } from './TabBar'
import { toValidTailwindVersion } from '../utils/toValidTailwindVersion'
import { MDXComponents } from './MDX/MDXComponents'

const HEADER_HEIGHT = 60 - 1
const TAB_BAR_HEIGHT = 40
const RESIZER_SIZE = 1
const DEFAULT_RESPONSIVE_SIZE = { width: 540, height: 720 }

export default function Pen({
  initialContent,
  initialPath,
  initialLayout,
  initialResponsiveSize,
  initialActiveTab,
}) {
  const copyRef = useRef(null)
  const previewRef = useRef()
  const worker = useRef()
  const [size, setSize] = useState({ percentage: 0.5, layout: initialLayout })
  const [resizing, setResizing] = useState(false)
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  const [activePane, setActivePane] = useState(
    initialLayout === 'preview' ? 'preview' : 'editor'
  )
  const isLg = useMedia('(min-width: 1024px)')
  const [dirty, setDirty] = useState(false)
  const [renderEditor, setRenderEditor] = useState(false)
  const [error, setError, setErrorImmediate, cancelSetError] =
    useDebouncedState(undefined, 1000)
  const editorRef = useRef()
  const [responsiveDesignMode, setResponsiveDesignMode] = useState(
    initialResponsiveSize ? true : false
  )
  const [shouldClearOnUpdate, setShouldClearOnUpdate] = useState(true)
  const [isLoading, setIsLoading, setIsLoadingImmediate] = useDebouncedState(
    false,
    1000
  )
  const [responsiveSize, setResponsiveSize] = useState(
    initialResponsiveSize || DEFAULT_RESPONSIVE_SIZE
  )
  const [tailwindVersion, setTailwindVersion] = useState(
    toValidTailwindVersion(initialContent.version)
  )
  const [jit, setJit] = useState(false)

  useEffect(() => {
    setDirty(true)
  }, [
    activeTab,
    size.layout,
    responsiveSize.width,
    responsiveSize.height,
    responsiveDesignMode,
    tailwindVersion,
  ])

  useEffect(() => {
    if (dirty) {
      function handleUnload(e) {
        e.preventDefault()
        e.returnValue = ''
      }
      window.addEventListener('beforeunload', handleUnload)
      return () => {
        window.removeEventListener('beforeunload', handleUnload)
      }
    }
  }, [dirty])

  useEffect(() => {
    setDirty(false)
    setTailwindVersion(toValidTailwindVersion(initialContent.version))
    if (
      shouldClearOnUpdate &&
      previewRef.current &&
      previewRef.current.contentWindow
    ) {
      previewRef.current.contentWindow.postMessage(
        {
          clear: true,
        },
        '*'
      )
      inject({ html: initialContent.html })
      compileNow({
        html: initialContent.html,
        css: initialContent.css,
        config: initialContent.config,
        tailwindVersion: toValidTailwindVersion(initialContent.version),
      })
    }
  }, [initialContent.ID])

  const inject = useCallback(async (content) => {
    previewRef.current.contentWindow.postMessage(content, '*')
  }, [])

  async function compileNow(content) {
    if (content.config) {
      let validateResult = await validateJavaScript(content.config)
      if (!validateResult.isValid) {
        return setError({ ...validateResult.error, file: 'Config' })
      }
    }
    cancelSetError()
    setIsLoading(true)

    localStorage.setItem('content', JSON.stringify(content))

    // const file = new VFile({ basename: 'example.mdx', value: content.html })

    // const capture = (name) => () => (tree) => {
    //   console.log(tree)

    //   visit(tree, 'code', (node, index, parent) => {
    //     node.lang = language
    //     console.log(node)
    //   })

    // }
    const remarkPlugins = []

    remarkPlugins.push(remarkGfm)
    remarkPlugins.push(remarkFrontmatter)
    remarkPlugins.push(remarkMath)

    //remarkPlugins.push(capture('mdast'))

    try {
      const { default: Content } = await evaluate(content.html, {
        ...runtime,
        format: 'mdx',
        useDynamicImport: true,
        remarkPlugins,
        //rehypePlugins: [capture('hast')],
        //recmaPlugins: [capture('esast')],
        useMDXComponents,
      })
      content.html = ReactDOMServer.renderToString(
        <MDXProvider components={MDXComponents}>
          <Content />
        </MDXProvider>
      )

      const { css, html, jit, canceled, error } = await requestResponse(
        worker.current,
        content
      )
      // const css1 = css
      //   .replace(/ \/ var\(--tw-text-opacity\)/g, '')
      //   .replace(/ \/ var\(--tw-bg-opacity\)/g, '')
      //   .replace(/ \/ var\(--tw-border-opacity\)/g, '')
      //   .replace(/\d+.\d+rem|\d+rem/g, (a, b) => {
      //     return parseFloat(a) * 16 + 'px'
      //   })
      // console.log(css1)
      if (canceled) {
        return
      }
      setIsLoadingImmediate(false)
      if (error) {
        setError(error)
        return
      }
      setErrorImmediate()
      setJit(Boolean(jit))
      if (css || html) {
        copyRef.current.set({ css, html })
        inject({ css, html })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const compile = useCallback(debounce(compileNow, 200), [])

  const onChange = useCallback(
    (document, content) => {
      setDirty(true)
      if (document === 'html' && !jit) {
        inject({ html: content.html })
      } else {
        compile({
          html: content.html,
          css: content.css,
          config: content.config,
          skipIntelliSense: document === 'html',
          tailwindVersion,
        })
      }
    },
    [inject, compile, jit, tailwindVersion]
  )

  useEffect(() => {
    worker.current = new Worker()
    return () => {
      worker.current.terminate()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      setSize((size) => {
        const windowSize =
          size.layout === 'horizontal'
            ? document.documentElement.clientHeight - HEADER_HEIGHT
            : document.documentElement.clientWidth

        if (isLg && size.layout !== 'preview') {
          const min = size.layout === 'vertical' ? 320 : 320 + TAB_BAR_HEIGHT
          const max =
            size.layout === 'vertical'
              ? windowSize - min - RESIZER_SIZE
              : windowSize - 320 - RESIZER_SIZE

          return {
            ...size,
            min,
            max,
            current: Math.max(
              Math.min(Math.round(windowSize * size.percentage), max),
              min
            ),
          }
        }

        const newSize =
          (isLg && size.layout !== 'preview') ||
          (!isLg && activePane === 'editor')
            ? windowSize
            : 0

        return {
          ...size,
          current: newSize,
          min: newSize,
          max: newSize,
        }
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [isLg, setSize, size.layout, activePane])

  useEffect(() => {
    if (isLg) {
      if (size.layout !== 'preview') {
        setRenderEditor(true)
      }
    } else if (activePane === 'editor') {
      setRenderEditor(true)
    }
  }, [activePane, isLg, size.layout])

  useEffect(() => {
    if (resizing) {
      document.body.classList.add(
        size.layout === 'vertical' ? 'cursor-ew-resize' : 'cursor-ns-resize'
      )
    } else {
      document.body.classList.remove(
        size.layout === 'vertical' ? 'cursor-ew-resize' : 'cursor-ns-resize'
      )
    }
  }, [resizing])

  const updateCurrentSize = useCallback((newSize) => {
    setSize((size) => {
      const windowSize =
        size.layout === 'vertical'
          ? document.documentElement.clientWidth
          : document.documentElement.clientHeight - HEADER_HEIGHT
      const percentage = newSize / windowSize
      return {
        ...size,
        current: newSize,
        percentage:
          percentage === 1 || percentage === 0 ? size.percentage : percentage,
      }
    })
  }, [])

  const onShareStart = useCallback(() => {
    setDirty(false)
  }, [])

  const onShareComplete = useCallback(
    (path) => {
      setShouldClearOnUpdate(false)
      Router.push(path).then(() => {
        setShouldClearOnUpdate(true)
      })
    },
    [size.layout, responsiveDesignMode, responsiveSize]
  )

  // initial state resets
  useEffect(() => {
    setSize((size) => ({ ...size, layout: initialLayout }))
  }, [initialLayout])
  useEffect(() => {
    setResponsiveDesignMode(Boolean(initialResponsiveSize))
    setResponsiveSize(initialResponsiveSize || DEFAULT_RESPONSIVE_SIZE)
  }, [initialResponsiveSize])
  useEffect(() => {
    setActiveTab(initialActiveTab)
  }, [initialActiveTab])

  return (
    <>
      <Header
        layout={size.layout}
        onChangeLayout={(layout) => setSize((size) => ({ ...size, layout }))}
        responsiveDesignMode={responsiveDesignMode}
        onToggleResponsiveDesignMode={() =>
          setResponsiveDesignMode(!responsiveDesignMode)
        }
        tailwindVersion={tailwindVersion}
        onChangeTailwindVersion={(version) => {
          setTailwindVersion(version)
          compileNow({ _recompile: true, tailwindVersion: version })
        }}
      >
        <Share
          editorRef={editorRef}
          onShareStart={onShareStart}
          onShareComplete={onShareComplete}
          dirty={dirty}
          initialPath={initialPath}
          layout={size.layout}
          responsiveSize={responsiveDesignMode ? responsiveSize : undefined}
          activeTab={activeTab}
          tailwindVersion={tailwindVersion}
        />
        <CopyBtn ref={copyRef} />
      </Header>
      <main className="flex-auto relative border-t border-gray-200 dark:border-gray-800">
        {initialContent && typeof size.current !== 'undefined' ? (
          <>
            {(!isLg || size.layout !== 'preview') && (
              <TabBar
                width={
                  size.layout === 'vertical' && isLg ? size.current : '100%'
                }
                isLoading={isLoading}
                showPreviewTab={!isLg}
                activeTab={
                  isLg || activePane === 'editor' ? activeTab : 'preview'
                }
                onChange={(tab) => {
                  if (tab === 'preview') {
                    setActivePane('preview')
                  } else {
                    setActivePane('editor')
                    setActiveTab(tab)
                  }
                }}
              />
            )}
            <SplitPane
              split={size.layout === 'horizontal' ? 'horizontal' : 'vertical'}
              minSize={size.min}
              maxSize={size.max}
              size={size.current}
              onChange={updateCurrentSize}
              paneStyle={{ marginTop: -1 }}
              pane1Style={{ display: 'flex', flexDirection: 'column' }}
              onDragStarted={() => setResizing(true)}
              onDragFinished={() => setResizing(false)}
              allowResize={isLg && size.layout !== 'preview'}
              resizerClassName={
                isLg && size.layout !== 'preview'
                  ? 'Resizer'
                  : 'Resizer-collapsed'
              }
            >
              <div className="border-t border-gray-200 dark:border-white/10 mt-12 flex-auto flex">
                {renderEditor && (
                  <Editor
                    editorRef={(ref) => (editorRef.current = ref)}
                    initialContent={initialContent}
                    onChange={onChange}
                    worker={worker}
                    activeTab={activeTab}
                    tailwindVersion={tailwindVersion}
                  />
                )}
              </div>
              <div className="absolute inset-0 w-full h-full">
                <Preview
                  ref={previewRef}
                  responsiveDesignMode={isLg && responsiveDesignMode}
                  responsiveSize={responsiveSize}
                  onChangeResponsiveSize={setResponsiveSize}
                  iframeClassName={resizing ? 'pointer-events-none' : ''}
                  onLoad={() => {
                    inject({
                      html: initialContent.html,
                      ...(initialContent.compiledCss
                        ? { css: initialContent.compiledCss }
                        : {}),
                    })
                    compileNow({
                      css: initialContent.css,
                      config: initialContent.config,
                      html: initialContent.html,
                      tailwindVersion: initialContent.version,
                    })
                  }}
                />
                <ErrorOverlay error={error} />
              </div>
            </SplitPane>
          </>
        ) : null}
      </main>
    </>
  )
}
