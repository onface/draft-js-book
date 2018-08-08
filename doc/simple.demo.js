import React from "react";
import ReactDOM from "react-dom";
import Draft from "draft-js";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    let blocksFromHTML = Draft.convertFromHTML(props.html)
    this.state = {
        editorState: Draft.EditorState.createWithContent(
            Draft.ContentState.createFromBlockArray(
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
      <Draft.Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}
const rootElement = document.getElementById("getting-started-simple-editor")
ReactDOM.render(<MyEditor html="abcdef" />, rootElement)
