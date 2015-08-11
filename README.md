# webpack-react-es6

This repo carries some skeleton files to support JavaScript ES6 / webpack / react / kefir development.

Run `npm install` and `npm start` to see the demo app.

# Using React with Kefir

The architecture of the application follows the basic FRP design:

Stream of view = _render_ ( Stream of model )

View event callbacks and all other inputs are merged into a Stream of ui_input

Stream of model = scan (initial model) (Stream of update)

Stream of update = _business logic_ (Stream of ui_event)
