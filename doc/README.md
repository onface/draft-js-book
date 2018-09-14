# 文档

## 处理快捷键命令

````code
{
    title: 'handleKeyCommand',
    desc: '选中文字使用 `ctrl` + `b` 等快捷键',
    html: '<div id="handleKeyCommand-demo" style="border:1px solid #ddd;margin:1em;" ></div>',
    source: './handleKeyCommand.demo.js',
    side: true
}
````


## 渲染链接

````code
{
    title: 'renderLink',
    desc: '',
    html: '<div id="renderLink-demo" style="border:1px solid #ddd;margin:1em;" ></div>',
    source: './renderLink.demo.js',
    side: true
}
````

## 编辑链接

````css
.edit-link {
    display: none;
}
a:hover .edit-link{
    display: inline;
}
````

````code
{
    title: 'editLink',
    desc: '',
    html: '<div id="editLink-demo" style="border:1px solid #ddd;margin:1em;" ></div>',
    source: './editLink.demo.js',
    side: true
}
````

## mention


````css
.mention {
    z-index: 99;
    width: 800%;
    position: absolute;
    z-index: 99;
    top: 100%;
    left:0;
    background-color:  white;
    border:1px solid #eee;
    border-radius: .2em;
}
.mention-item:hover {
    cursor: pointer;
    color:orange
}
````

````code
{
    title: 'mention',
    desc: '',
    html: '<div id="mention-demo" style="border:1px solid #ddd;margin:1em;" ></div>',
    source: './mention.demo.js',
    side: true
}
````
