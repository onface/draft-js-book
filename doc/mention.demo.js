import React from "react";
import ReactDOM from "react-dom";
import Draft from "draft-js";
import invariant from "invariant"

const HANDLE_REGEX = /@[\w]+/g
function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText()
    let matchArr, start
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index
      callback(start, start + matchArr[0].length)
    }
}

function getDecorator (own) {
    return new Draft.CompositeDecorator([
       {
         strategy:  function handleStrategy(contentBlock, callback, contentState) {
             findWithRegex(HANDLE_REGEX, contentBlock, callback);
         },
         component: (props) => {
             let editorState = Draft.EditorState.createWithContent(props.contentState, getDecorator(own))
             let selectionState = editorState.getSelection()
             // console.log(props.offsetKey.indexOf(selectionState.getFocusKey()))
             return (
              <span
                style={{color: 'green', position: 'relative'}}
                data-offset-key={props.offsetKey}
              >
                {props.children}
                {/*
                正式环境可以将弹出层渲染到 body 防止提示内容被编辑
                https://doc.react-china.org/docs/portals.html
                */}
                <div className="mention" >
                    <div className="mention-item" >{props.decoratedText}-abc</div>
                    <div className="mention-item" >{props.decoratedText}-123</div>
                </div>
              </span>
            )
         },
       }
     ])
}


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    let blocksFromHTML = Draft.convertFromHTML(props.html)
    this.state = {
        editorState: Draft.EditorState.createWithContent(
            Draft.ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            ),
          getDecorator(this)
        )
    }
  }
  emitChange = (editorState, callback) => {
      const self = this
      self.setState({ editorState }, callback)
  }
  render() {
    const self = this
    return (
      <div>
          <Draft.Editor
            editorState={this.state.editorState}
            onChange={this.emitChange}
          />
      </div>
    )
  }
}
const rootElement = document.getElementById("mention-demo")
ReactDOM.render(<MyEditor html={`input @some test`} />, rootElement)
