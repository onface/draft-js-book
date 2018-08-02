# 快速上手

## 概述

Draft.js 是创建富文本编辑器的框架，它基于 React 实现。基于不可变模式 `(immutable model)` 和兼容多浏览器。

Draft.js 可以轻松的创建任何类型的富文本输入，无论是简单的文本输入框，还是文章编辑器都能轻松实现。

2016年2月 React Conf 大会介绍 Draft.js (你需要科学上网才能观看此视频)

<iframe width="840" height="472" src="https://www.youtube.com/embed/feUYwoLhE_4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### 安装

你可以通过 npm 安装 draft.js ，并且需要安装 `react` 和 `react-dom`。

```shell
npm install --save draft-js react react-dom
# or alternately
yarn add draft-js react react-dom
```

Draft.js 使用最新的 ecmascript 特性，如果代码无法再某些浏览器正常工作。建议在调用 Draft.js 前加载这些代码.

```html
<!-- Polyfills -->
   <!--[if lt IE 10]>
   <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
   <![endif]-->
   <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
```

## 基础 API

本节概述 Draft.js 的基础知识。

### 受控输入

`Editor` 是一个受控的 [ContentEditable](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_Editable) 组件，用于提供 React 受控组件所需的顶层 API。

随便提一下，受控组件有两个关键部分

1. `value` 接收 `state` 中的值
2. `onChange` 函数将用户输入的数据更新到 `state`

这种方式可以严格控制组件的显示内容，同时接收用户的输入并更新到组件中。

```js
class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.onChange = (evt) => this.setState({value: evt.target.value});
  }
  render() {
    return <input value={this.state.value} onChange={this.onChange} />;
  }
}
```

除了用户输入外顶层组件可以通过修改 `state.value` 控制组件显示内容。
