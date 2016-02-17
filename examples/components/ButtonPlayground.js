import React from 'react';
import { Button, Card } from 'belle';

export default React.createClass({

  render() {
    return (
      <Card>
        <h2>Button</h2>

        <h3>Default Button</h3>
        <button>Press me …</button>

        <h3>Disabled Default Button</h3>
        <button disabled>Press me …</button>

        <h3>Default Button</h3>
        <Button>Press me …</Button>

        <h3>Disabled Button</h3>
        <Button disabled>Press me …</Button>

        <h3>Primary Button</h3>
        <Button primary>Primary Button</Button>

        <h3>Disabled Primary Button</h3>
        <Button disabled primary>Press me …</Button>

        <h3>Colored Buttons</h3>
        <Button primary hoverStyle={{ color: 'blue' }}>Primary Button</Button>

        <Button primary hoverStyle={{ color: 'red' }}>Primary Button</Button>

        <Button primary hoverStyle={{ color: 'green' }}>Primary Button</Button>
      </Card>
    );
  },
});
