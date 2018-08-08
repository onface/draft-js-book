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
    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState);
            return 'handled'
        }
        return 'not-handled'
    }
    onChange = (editorState) => {
        this.setState({ editorState })
    }
    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
            />
        )
    }
}
const rootElement = document.getElementById("handleKeyCommand-demo");
ReactDOM.render(<MyEditor html="abcdefg" />, rootElement);
