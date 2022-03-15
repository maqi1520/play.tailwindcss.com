import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export async function getDefaultContent() {
  const html = `## heading
### 2323
`
  const css = `/*默认样式，最佳实践*/

  /*全局属性*/
  #nice {
    font-size: 16px;
    color: black;
    padding: 0 10px;
    line-height: 1.6;
    word-spacing: 0px;
    letter-spacing: 0px;
    word-break: break-word;
    word-wrap: break-word;
    text-align: left;
    font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    /* margin-top: -10px; 解决开头空隙过大问题*/
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
  
  #nice h1 .suffix
  #nice h2 .suffix,
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
    color: rgb(1,1,1); /* 只要是纯黑色微信编辑器就会把color这个属性吞掉。。。*/
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
    padding:1px 23px;
    margin:22px 0;
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
  #nice a {
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
    border-top: 1px solid black;
  }
  
  /*代码块*/
  #nice pre {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow:2px 4px 7px #999;
  }
  #nice pre:before{
    content: "";
      display: block;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAcCAYAAACERFoMAAAFdklEQVRoQ+2aTWwTRxiGv5nddez1/jjGAYJDEwhSCRzDjUKDgFagVAgQ7aURvVDEFXFFCHGlXBHiUkQvLSIIkYLagBpA3MgR0koEEogJEMfx/njX8e7OVLuOU0jjkKzXaSOtzzuzj+fd79U7Mx+C8LeiVgAtlvZxZye3plHcboPTgSik3HEUQZYFZujtlPZo2+Cgtdi56vHc40ud3Cpe2U4c0oEQKvNRmsUMHpo05Efbjv+3fJ2XOrm3ycJ2SlEHoPL6AYUsQnRoLBd/BIvk+6hgI7s/38Uw6CShdB/LMlqE4yIsg2Pu+2yHmCXLKtm2I2KE7jgOvdB27/4f9RCk2pzPrrTv4lw+QvdxLNYiESbCMjDDB2ap5JQsm4gYozuWQy9sOjq8rHzpnz/dBRx7kjpkH8OxGo6wEcSW14/axCQlu+RYtogYfAc5zg9jR/4cWGj9qgo28uWOZkSYyxjDTlkUxHgsChjjeecihEDBLIKi6Roh8IBi51jbbw/H6yncyNXWZgD2MgK0MyFxosCzgPH8f4cQCrphQ161NAr0AYB9rK1ntK58rdc7mm3AlwHBzgYpLrLxKKAqfJRQsApFKKkFDQDuswXy/WjP0Lx88/5Dt6oQhl5J4OWEJH60Ct8XJq9qVNUNhRI4VK9qc6uKRdAriZzcKEWWxDellqiqWYpN4VC9qs2rKpbp5cSY3CALS+KbVnRqqaaCKDk4X7X9a7IZsfpTjTLDx6K+isQwi5CdUhxKYG/QorliMQj6m5INTDzG+uIrmDZM5KYdh8LeoEVzxaIM7o+tkhmWb/DFZxvTYGYVBwPdM1e0DwQr2yB+mmqUE37FqhDOiJanmGwJyh49G6Ts01SyIeFXrAqfK1o2N50HZG8Jyh7LNoieRpNSwq9YFT5XtOKkmmcR3TJ6+B97/ECw0b1dfZIQ279UG6z2GZXt0bzd2j/Q7etTmzNo5Gp7nyRw+5dqg9Xe7dmjbt1u6xkOhC99fWsfJ0b3L9UGq/F59qgXf80cevJV5ZlZwbw0yKKbLWtXi0EsbmWOsTfvNMemB2q1Ri8NYnTzk3V8oHwvXxuaReiBWq1xJg3eFNKpQPn0TFYDyz6Q+eYvL93OCvbqi65bsiR0i3E+SL1AKxigqHrf+t8HZr8SPy8Y/WnTrYTIdUsC52d41TGqbkFes/pav31WE1+6d+utBinezYleYg/sZ2kmTKuFvkqVeYK5m+KmpGC2rG1iqkV3vwRu5B97M+FM5PSY3821tymO5c1PmnmmWnT3z0fh5bjhTJqJmN/NtbspHk8aptDSxFSL7n753Mivj004zTk+Nnh80PIEe7Wnqwtz+Ma61amE34kXGvf6XTZPLHJw/d2BBTeF1eZ4cXVTF8egG+k1sbrwZd6aecuhBzf0PPPF13JtcxfiuBt8c7IufMZ4Lk8ty4v5nmAv9uw4IfD8+VSjHKwfziiQnVIM3TBObbj78KKfD2L4x40nRCFyvqkxUhe+iamSoemlU+3fPffFl/6l4wQrRM9HV0l14StOqoatF09lvh666Ak2snvHaVkSzgaVDueK4qZFRdXPtN17eM6PYM+vtJ9OSNzZoNLhXAY3LeZV68zGo8O++NLXOk5zMn82qHQ4l89Li4pxJnNk6FwoGACsOMFCS1xhlhiGjhUWOsJYv8JivRftw43zytk4l5NieDTlJ8FWxiz70ZT74vDwtxbJAOpy+KsVb2cOP5k9nA6vV/7P1ys5Nc/CAtcrFWtEGMILTJ/FFtgF5qTiYPqRC8wKY9gi4FOtmWE1twhopoLIIlsEZkULm3BqUm1Zm3DeJw3b3GrSDZatzW0uZthIWptw7p3Zm4T+GSC8ua6NpLVhhqODXoG/AV56X1lhWm2vAAAAAElFTkSuQmCC);
      height: 30px;
      width: 100%;
      background-size: 40px;
      background-repeat: no-repeat;
      background-color: #282c34;
      margin-bottom: -7px;
      border-radius: 4px;
      background-position: 10px 10px;
  }
  #nice pre code {
    font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
    border-radius: 0px;
    font-size: 12px;
    background-color: #282c34;
    display:block;
    padding:10px;
     border-radius: 4px;
    -webkit-overflow-scrolling: touch;
  }
  #nice pre code span {
    line-height: 26px;
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
    background-color: rgba(27,31,35,.05);
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
  
  
  /*表格容器 */
  #nice .table-container{
    overflow-x: auto;
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
    background-color: #F8F8F8;
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
  #nice table tr td:nth-of-type(n){
    min-width:85px;
  }
  
  #nice .footnote-word {
    color: #1e6bb8;
    font-weight: bold;
  }
  
  #nice .footnote-ref {
    color: #1e6bb8;
    font-weight: bold;
  }
  
  #nice .footnote-item {
    display: flex;
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
  
  #nice .footnote-item p {
    display: inline;
    font-size: 14px;
    width: 90%;
    padding: 0px;
    margin: 0;
    line-height: 26px;
    color: black;
    word-break:break-all;
    width: calc(100%-50)
  }
  
  #nice sub, sup {
    line-height: 0;
  }
  
  #nice .footnotes-sep:before {
    content: "参考资料";
    display: block;
  }
  
  /* 解决公式问题 */
  #nice .block-equation {
    display:block;
    text-align: center;
    overflow: auto;
    display: block;
    -webkit-overflow-scrolling: touch;
  }
  
  #nice .block-equation svg {
    max-width: 300% !important;
    -webkit-overflow-scrolling: touch;
  }
  
  #nice .inline-equation {
  }
  
  #nice .inline-equation svg {
  }
  
  #nice .imageflow-layer1 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    white-space: normal;
    border: 0px none;
    padding: 0px;
    overflow: hidden;
  }
  
  #nice .imageflow-layer2 {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
  }
  
  #nice .imageflow-layer3 {
    display: inline-block;
    word-wrap: break-word;
    white-space: normal;
    vertical-align: middle;
    width: 100%;
  }
  
  #nice .imageflow-img {
    display: inline-block;
  }
  
  #nice .imageflow-caption {
    text-align: center;
    margin-top: 0px;
    padding-top: 0px;
    color: #888;
  }
  
  #nice .nice-suffix-juejin-container {
    margin-top: 20px !important;
  }
  
  #nice figure a {
    border: none;
  }
  
  #nice figure a img {
    margin: 0px;
  }
  
  #nice figure {
    display:flex;
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
    background: rgba(0,0,0,0.7);
    color: white;
    line-height: 35px;
    z-index: 20;
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
