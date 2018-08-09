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
    handleKeyCommand = (command, editorState) => {
        const newState = Draft.RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.emitChange(newState);
            return 'handled'
        }
        return 'not-handled'
    }
    emitChange = (editorState) => {
        this.setState({ editorState })
    }
    render() {
        return (
            <Draft.Editor
                editorState={this.state.editorState}
                onChange={this.emitChange}
                handleKeyCommand={this.handleKeyCommand}
            />
        )
    }
}
const rootElement = document.getElementById("handleKeyCommand-demo");
ReactDOM.render(<MyEditor html="abcdefg" />, rootElement);
