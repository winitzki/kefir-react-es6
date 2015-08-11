import React from 'react'

export default class Message extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <input type="checkbox" value="box1" checked={this.props.checked} onChange={this.props.checkboxInputCallback}></input>
      {(this.props.checked) ? <div>{this.props.children}</div> : <div/>}
    </div>
  }
}
