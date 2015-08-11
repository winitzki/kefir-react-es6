import React from 'react'
import Message from './Message'
import * as KG from '../kefir-glue'
import K from 'kefir'

const initModelState = { checked: true }

const checkboxInput = K.pool()
const allInput = K.merge([checkboxInput])

function updater(prevState, event) {
  return { checked: !prevState.checked }
}

const modelState = allInput.scan(updater, initModelState)


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = initModelState
  }

  render() {
    const messageProps = {
      checkboxClick: KG.emitTo(checkboxInput),
      checked: this.state.checked
    }

    return <Message {...messageProps}>{this.props.children}</Message>
  }

  // boilerplate for binding the state to Kefir observables
  componentDidMount() {
    this.unkefirState = KG.state({checked: modelState}, this)
  }
  componentWillUnmount() {
    this.unkefirState()
  }

}
