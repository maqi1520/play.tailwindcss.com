import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export async function getDefaultContent() {
  const html = `## heading
### 2323
`
  const css = `.code__card {
  background-color: #1E1E1E;
  border-radius: 5px;
  z-index: 1;
  box-shadow:rgb(0 0 0 / 55%) 0px 2px 10px;
}

.code__tools {
  display: flex;
  align-items: center;
  padding:12px;
}
.code__card__content {
  padding: 0 12px 12px 12px;
  font-size: 12px;
  -webkit-overflow-scrolling: touch;
}

.code__circle {
  display: inline-block;
  align-items: center;
  width: 9px;
  height: 9px;
  margin-right:8px;
  padding: 1px;
  border-radius: 50%;
}
.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}

/*默认样式，最佳实践*/

/*全局属性*/
#nice {
  font-family:Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: black;
  line-height: 1.6;
  word-spacing: 0px;
  letter-spacing: 0px;
  word-break: break-word;
  word-wrap: break-word;
  text-align: left;
}

/*段落*/
#nice p {
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0;
  line-height: 26px;
  color: black;
}

/*标题*/
#nice h1,
#nice h2,
#nice h3,
#nice h4,
#nice h5,
#nice h6 {
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 0px;
  font-weight: bold;
  color: black;
}
#nice h1 {
  font-size: 24px;
}
#nice h2 {
  font-size: 22px;
}
#nice h3 {
  font-size: 20px;
}
#nice h4 {
  font-size: 18px;
}
#nice h5 {
  font-size: 16px;
}
#nice h6 {
  font-size: 16px;
}

#nice h1 .prefix,
#nice h2 .prefix,
#nice h3 .prefix,
#nice h4 .prefix,
#nice h5 .prefix,
#nice h6 .prefix {
  display: none;
}

#nice h1 .suffix #nice h2 .suffix,
#nice h3 .suffix,
#nice h4 .suffix,
#nice h5 .suffix,
#nice h6 .suffix {
  display: none;
}

/*列表*/
#nice ul,
#nice ol {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 25px;
  color: black;
}
#nice ul {
  list-style-type: disc;
}
#nice ul ul {
  list-style-type: square;
}

#nice ol {
  list-style-type: decimal;
}

#nice li section {
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 26px;
  text-align: left;
  color: rgb(1, 1, 1); /* 只要是纯黑色微信编辑器就会把color这个属性吞掉。。。*/
  font-weight: 500;
}

/*引用*/
#nice blockquote {
  border: none;
}

#nice blockquote {
  display: block;
  font-size: 0.9em;
  overflow: auto;
  overflow-scrolling: touch;
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.05);
  color: #6a737d;
  padding: 1px 23px;
  margin: 22px 0;
}

#nice blockquote p {
  margin: 0px;
  color: black;
  line-height: 26px;
}

#nice .table-of-contents a {
  border: none;
  color: black;
  font-weight: normal;
}

/*链接*/
#nice a,#nice .link {
  text-decoration: none;
  color: #1e6bb8;
  word-wrap: break-word;
  font-weight: bold;
  border-bottom: 1px solid #1e6bb8;
}

/*加粗*/
#nice strong {
  font-weight: bold;
  color: black;
}

/*斜体*/
#nice em {
  font-style: italic;
  color: black;
}

/*加粗斜体*/
#nice em strong {
  font-weight: bold;
  color: black;
}

/*删除线*/
#nice del {
  font-style: italic;
  color: black;
}

/*分隔线*/
#nice hr {
  height: 1px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid #333;
}

/*行内代码*/
#nice p code,
#nice li code {
  font-size: 14px;
  word-wrap: break-word;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  color: #1e6bb8;
  background-color: rgba(27, 31, 35, 0.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  word-break: break-all;
}

/*图片*/
#nice img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

/*图片*/
#nice figure {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

/*图片描述文字*/
#nice figcaption {
  margin-top: 5px;
  text-align: center;
  color: #888;
  font-size: 14px;
}

/*表格*/
#nice table {
  display: table;
  text-align: left;
}
#nice tbody {
  border: 0;
}

#nice table tr {
  border: 0;
  border-top: 1px solid #ccc;
  background-color: white;
}

#nice table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

#nice table tr th,
#nice table tr td {
  font-size: 16px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}

#nice table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}

/* 表格最小列宽4个汉字 */
#nice table tr th:nth-of-type(n),
#nice table tr td:nth-of-type(n) {
  min-width: 85px;
}

#nice sub,
sup {
  line-height: 0;
}

#nice figure a {
  border: none;
}

#nice figure a img {
  margin: 0px;
}

#nice figure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套 */
#nice figure a {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片链接嵌套，图片解释 */
#nice figure a + figcaption {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -35px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  line-height: 35px;
  z-index: 20;
}
#nice .footnote-ref {
  color: #1e6bb8;
  font-size: 75%;
  position: relative;
  top: -4px;
  left: 2px;
  font-weight: bold;
}

#nice .footnote-item {
  display: flex;
  font-size: 14px;
}

#nice .footnote-num {
  display: inline;
  width: 10%; /*神奇，50px就不可以*/
  background: none;
  font-size: 80%;
  opacity: 0.6;
  line-height: 26px;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#nice .footnote-item .footnote-content {
  display: inline;
  font-size: 14px;
  width: 90%;
  padding: 0px;
  margin: 0;
  line-height: 26px;
  color: black;
  word-break:break-all;
}`
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
