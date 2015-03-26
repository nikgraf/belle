# Belle

React Components with great User Experience.

Notice: Keep in mind this library is early stage and might change a lot soon.

Website & Documentation: [http://nikgraf.github.io/belle/](http://nikgraf.github.io/belle/)

## Getting started

With [npm](http://npmjs.org) do:

```
npm install belle
```

Import & use the Belle components

```
"use strict";

import React, {Component} from 'react';
import {Input} from 'belle';

class App extends Component {

  render() {
    return <div style={ {width: 250} }>
      <Input defaultValue="Update me and see how the input grows …" />
    </div>
  }
}

React.render(<App/>, document.getElementById('body'));
```

Checkout the examples app to learn about the implemented components.

## Philosophy

"Great UX starts with a good UI"

With Belle I'm aiming to provide a library that follows a couple well established
principles. While some of them might not be what is consider best practice today
I believe they will become some day in the near future.

### Easy to use

The most important attribute of any great experience is that there was no hassle to achieve
your goals.

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

### Run the examples or docs

To run the examples or docs you should run `npm install` and `npm start` in the examples/docs folder as well.

Use `python -m SimpleHTTPServer 8310` in the examples folder to run it on localhost.

## Future Work

- Introduce some kind of styling configuration
- Add disabled style to Input & Button
- Introduce preventing new line for Input
- Add share-bar to documentation
- Make sure components don't break when rendered by the backend
- Components to add: rating, autocomplete, dateformatter, datepicker, toggle, checkbox, tooltip, popover, menu/dropdown, input of type number, input of type email, anchor?, code?

## License

MIT

This library also contains a copy of the React Software which is licensed under BSD.
