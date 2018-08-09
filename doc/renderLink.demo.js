import React from "react";
import ReactDOM from "react-dom";
import Draft from "draft-js";

const decorator = new Draft.CompositeDecorator([
   {
     strategy: function (contentBlock, callback, contentState) {
         contentBlock.findEntityRanges(
             (character) => {
                 const entityKey = character.getEntity();
                 return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
             },
             callback
         )
     },
     component: (props) => {
         const data = props.contentState.getEntity(props.entityKey).getData();
         return (
             <a {...data} href={data.url}>
                 {props.children}
             </a>
         )
     }
   }
 ])


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
          decorator
        )
    }
  }
  emitChange = (editorState) => {
      this.setState({ editorState })
  }
  render() {
    return (
      <Draft.Editor
        editorState={this.state.editorState}
        onChange={this.emitChange}
      />
    )
  }
}
const rootElement = document.getElementById("renderLink-demo")
ReactDOM.render(<MyEditor html={`link: <a target="_blank" href="https://onface.live">onface</a>`} />, rootElement)
