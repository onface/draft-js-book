import React from "react";
import ReactDOM from "react-dom";
import Draft from "draft-js";
import invariant from "invariant"
// https://github.com/HubSpot/draft-extend/blob/c453fa7dd61f28fa5849f097cbbed6834639536b/src/plugins/utils.js#L46
function getEntitySelection(contentState, entityKey) {
   const selections = [];
   contentState.getBlocksAsArray().forEach((block) => {
     block.findEntityRanges(
       (c) => c.getEntity() === entityKey,
       (start, end) => {
         selections.push(Draft.SelectionState.createEmpty(block.getKey()).merge({
           anchorOffset: start,
           focusOffset: end,
           isBackward: false,
           hasFocus: true
         }));
       }
     );
   });
   invariant(
     selections.length === 1,
     'getEntitySelection: More than one range with the same entityKey. Please use unique entity instances'
   );
   return selections[0];
 }

function getDecorator (own) {
    return new Draft.CompositeDecorator([
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
                     <i
                        className="edit-link"
                        style={{fontSize: '0.8em', color: 'orange', cursor: 'pointer'}}
                        onClick={(e) => {
                            e.preventDefault()
                            let text = prompt("文字内容", props.decoratedText)
                            let link = prompt("链接地址", data.url)
                            if (text && link) {
                                // text
                                let newContentState = Draft.Modifier.replaceText(
                                  props.contentState,
                                  getEntitySelection(props.contentState, props.entityKey),
                                  text,
                                  null,
                                  props.entityKey
                                )
                                const newState = Draft.EditorState.push(own.state.editorState, newContentState, 'insert-characters')
                                // link
                                let contentState = newState.getCurrentContent()
                                newContentState = contentState.mergeEntityData(props.entityKey, { url: link, href: link })
                                // 一定要有 getDecorator
                                own.emitChange(Draft.EditorState.createWithContent(newContentState, getDecorator(own)))
                            }
                        }}
                     >Edit</i>
                 </a>
             )
         }
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
        ),
      raw: {}
    }
  }
  componentDidMount = () => {
      const self = this
      self.debug()
  }
  emitChange = (editorState, callback) => {
      const self = this
      self.setState({ editorState }, function () {
          if (callback) {
              callback()
          }
          self.debug()
      })
  }
  debug = () => {
      const self = this
      self.setState({
          raw: Draft.convertToRaw(self.state.editorState.getCurrentContent())
      })
  }
  render() {
    const self = this
    return (
      <div>
          <Draft.Editor
            editorState={this.state.editorState}
            onChange={this.emitChange}
          />
          <button onClick={self.debug} >DEBUG</button>
          <pre>{JSON.stringify(self.state.raw, null, 4)}</pre>
      </div>
    )
  }
}
const rootElement = document.getElementById("editLink-demo")
ReactDOM.render(<MyEditor html={`click this link change it: <a target="_blank" href="https://onface.live">onface</a>`} />, rootElement)
