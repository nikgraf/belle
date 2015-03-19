# Belle

React Components with a great User Experience.

Notice: Keep in mind this library is early stage and might change a lot soon.

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

## Development

Whenever you change something in `src/` you can compile it during development with

```
npm start
```

To run the examples you should run `npm start` in the examples folder as well.

Use `python -m SimpleHTTPServer 8310` in the examples folder to run it on localhost.
In order to make Belle available in the exampled you need to manually create a link
inside like this `ln -s ../../ belle`.

# License

MIT
