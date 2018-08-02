var React = require('react')
var ReactDOM = require('react-dom')
var Draftjsbook = require('draft-js-book')
class Simple extends React.Component {
    render () {
        return (
            <div>
                <Draftjsbook>default</Draftjsbook>
            </div>
        )
    }
}
/*ONFACE-DEL*/Simple = require("react-hot-loader").hot(module)(Simple)
ReactDOM.render(
    <Simple />,
    document.getElementById('simple-demo')
)

