import React from "react";
import ReactDOM from "react-dom";
import {
    Editor,
    EditorState,
    ContentState,
    RichUtils,
    convertFromHTML
} from "draft-js";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    let blocksFromHTML = convertFromHTML(props.html)
    this.state = {
        editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            )
        )
    }
  }
  onChange = (editorState) => {
      this.setState({ editorState })
  }
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}
const rootElement = document.getElementById("getting-started-simple-editor")
ReactDOM.render(<MyEditor html="abcdef" />, rootElement)
