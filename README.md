# Belle

[![Join the chat at https://gitter.im/nikgraf/belle](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nikgraf/belle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Configurable React Components with great UX.

Website & Documentation: [http://nikgraf.github.io/belle/](http://nikgraf.github.io/belle/)

![belle-overview](https://cloud.githubusercontent.com/assets/223045/8707250/f77634f8-2b34-11e5-92d1-f0b0fe44ade9.png)

## Getting Started

Belle is available as [npm](http://npmjs.org) package. Once you have npm you can install Belle in your project folder with:

```
npm install belle
```

### Import & use Belle Components

We recommend you get started with [React](https://facebook.github.io/react/) first. Once you have a simple application setup you can import any Belle component and use it right away. No stylesheets, font or any other prerequisite needed.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div id="react-root"></div>
  <!--
    You can use browserify, webpack or similar tools
    to compile & combine your JSX code
  -->
  <script src="bundle.js"></script>
</body>
</html>
```

```javascript
var React = require('react');
var belle = require('belle');
TextInput = belle.TextInput;

var App = React.createClass({

  render: function () {
    return <div>
      <TextInput defaultValue="Update here and see how the input grows …" />
    </div>;
  }
}

React.render(<App/>, document.getElementById('react-root'));
```

### Learn more

In addition you can dig through the [documentation](http://nikgraf.github.io/belle/) to learn about how to modify Belle components.

## Browser Support

- Chrome (mobile and desktop)
- Safari (mobile and desktop)
- Firefox
- Internet Explorer 9, 10, 11

## Philosophy

"Great UX starts with a good UI"

With Belle I'm aiming to provide a library that follows a couple well established
principles. While some of them might not be consider best practice today
We believe they will become some day in the near future.

### Easy to use

The most important attribute of any great experience is that there was no hassle to achieve
the initial goals.

### Consistent Behavior

Every object someone interacts with has it's own little language. This language
must be learned by everyone getting in touch with a new set of object. In order
to provide a great experience the amount to learn should be reduced to a minimum.

There are two major personalities to target with Belle. One is the developer.
For him/her APIs should be provided in a consistent way through all components.
The other and more important is the users of the components. Every color,
animation or behavior should be aligned with the other components to provide
a great experience.

### Encapsulate Styles

There is no reason while a style designed one specific element should affect
others. In CSS styles are often defined by overwriting previous ones and introducing
deeper and deeper nesting. Once nesting is introduced resolution of styles for one
specific element is not a trivial task anymore. Due this managing CSS dependencies
is hard. It is hard to predict how an application looks like after updating or
removing dependency.

That's why with Belle styles should apply to the components themselves in the DOM.
By doing so the visual appearance and business logic are combined in location.

### Every Interaction is followed up with Feedback

Let people know how their behavior affects the system. It assures them that
their input was acknowledged which provides them with a feeling of control over
the system.

### High Performance

The user should see affects of his actions instantly. Any delay can cause confusion
and frustration. While instant certainly is not always possible Belle strives to
provide an experience close to instant.

## Development

You can install the development environment with

```
npm install
```

Note: In case you want to add a peerDependency please make sure it get's removed
after running install since peerDependencies should not be in node_modules to
make them work properly. React & Underscore are removed in the `postinstall`
script which is defined in `package.json`.

Whenever you change something in `src/` you can compile it during development with

```
npm start
```

### Tests

Build Status:

[ ![Codeship Status for nikgraf/belle](https://codeship.com/projects/7650fa30-c483-0132-3f11-46867e328226/status?branch=master)](https://codeship.com/projects/74133)

In order to run the tests use

```
npm test
```

### Run the examples or docs

To run the examples or docs you should run `npm install` and `npm start` in the examples/docs folder as well.

Use `python -m SimpleHTTPServer 8310` in the examples folder to run it on localhost.

## Discussion or need help?

Join us at the **#belle** channel of the [Reactiflux](http://reactiflux.com/) Slack community

## Future Plans

- Components to add: Dateformatter, Datepicker, Tooltip, Popover, Modal, Navigation Menu, NumberInput, EmailInput, Anchor, DropZone

## Special Thanks

The implementation of the TextInput component was heavily inspired by implementations of [Andrey Popp](https://github.com/andreypopp) & [Eugene](https://github.com/eugene1g).

Thanks to [https://github.com/andreypopp](Andrey Popp) & [https://github.com/eugene1g](Eugene) for their inspiring work on [https://github.com/andreypopp/react-textarea-autosize](React TextArea Autosize) which kind of ignited the idea of Belle.

Thanks to Christian Steiner from [http://www.cropd.at/](cropd.at) for creating the logo and helping out with the design.

Special thanks to [https://github.com/jpuri](Jyoti Puri) for the tremendous amount of work she put into this endeavor.

## License

MIT

This library also contains a copy of the React Software which is licensed under BSD as well
as a copy of Underscore.js which is licensed under MIT.
