import K from 'kefir'
import React from 'react'

// make a stream out of each call of the callback
// fromCallbacks :: a'' -> S a
export function fromCallbacks(callbackConsumer) {

  return K.stream(emitter =>
    callbackConsumer(x => emitter.emit(x))
  )

}

// define streams recursively
// letrec :: (S a -> S a) -> S a
export function letrec(rec_definition) {
  const f = K.pool()
  f.plug(rec_definition(f))
  return f
}
export function letrec2(rec_def1, rec_def2) {
  const f = K.pool()
  const g = K.pool()
  f.plug(rec_def1(f,g))
  g.plug(rec_def2(f,g))
  return [f,g]
}

// define an emitter callback for an existing observable
// emitTo :: Observable -> Event -> ()
// \obs -> let emitter = Kefir.emitter(obs) in \event -> emitter.value(event)
export function emitTo(obs) {
  return event => obs._emitValue(event)
}

export function state(stateObservables, t) {
  const subscriptions = {}
  if (stateObservables) {
    Object.keys(stateObservables).forEach(key => {
      subscriptions[key] = subscriptions[key] || []
      const handler = value => t.setState({[key]: value[key]})
      subscriptions[key].push(handler)
      stateObservables[key].onValue(handler)
    })
  }
  return () => {
    Object.keys(subscriptions).forEach(key =>
        subscriptions[key].forEach(handler => stateObservables[key].offValue(handler))
    )

  }
}
