# Belle

Configurable React Components with great UX.

Website & Documentation: [http://nikgraf.github.io/belle/](http://nikgraf.github.io/belle/)

[<img src="https://cloud.githubusercontent.com/assets/223045/8707250/f77634f8-2b34-11e5-92d1-f0b0fe44ade9.png" width="50%">](http://nikgraf.github.io/belle/)

[![Build Status](https://travis-ci.org/nikgraf/belle.svg)](https://travis-ci.org/nikgraf/belle)
[![Dependency Status](https://david-dm.org/nikgraf/belle.svg)](https://david-dm.org/nikgraf/belle)
[![peerDependency Status](https://david-dm.org/nikgraf/belle/peer-status.svg)](https://david-dm.org/nikgraf/belle#info=peerDependencies)

## Getting Started

Belle is available as [npm](http://npmjs.org) package. Once you have npm you can install Belle in your project folder with:

```
npm install belle
```

### Import & use Belle Components

We recommend you to get started with [React](https://facebook.github.io/react/) first. Once you have a simple application setup you can import any Belle component and use it right away. No stylesheets, font or any other prerequisite needed.

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
var TextInput = belle.TextInput;

var App = React.createClass({

  render: function() {
    return (
      <div>
        <TextInput defaultValue="Update here and see how the input grows …" />
      </div>
    );
  }
});

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

The user should see affects of their actions instantly. Any delay can cause confusion
and frustration. While instant certainly is not always possible Belle strives to
provide an experience close to instant.

## Development

You can install the development environment with

```
npm install
```

`npm run build` will trigger a build into the `lib` folder. To develop a component it's convenient to use the examples or docs application.

### Run the examples or docs application

To run the examples or docs you go into the folder `docs` or `examples` and run `npm install` and `npm start`. The app will run with hot reloading on `http://localhost:3000`.

### Tests

In order to run the tests use

```
npm test
```

To run the test continuously you can use `npm run test:watch`.

## Discussion or need help?

Join us at our [Gitter room](https://gitter.im/nikgraf/belle).

In addition you can ask the community by [posting your question to StackOverflow with the **belle** tag.](http://stackoverflow.com/questions/ask?tags=belle).

## Future Plans

- Components to add: Dateformatter, Datepicker, Tooltip, Popover, Modal, Navigation Menu, NumberInput, EmailInput, Anchor, DropZone

## Special Thanks

Thanks to [Andrey Popp](https://github.com/andreypopp) & [Eugene](https://github.com/eugene1g) for their inspiring work on [React TextArea Autosize](https://github.com/andreypopp/react-textarea-autosize) which kind of ignited the idea of Belle.

Thanks to Christian Steiner from [http://www.cropd.at/](http://cropd.at) for creating the logo and helping out with the design.

Special thanks to [Jyoti Puri](https://github.com/jpuri) for the tremendous amount of work she put into this endeavor.

## License

MIT
