import React, { Component } from 'react';
import Card from '../../belle-classic/Card';
import Button from '../../belle-classic/Button';

export default class ButtonPlayground extends Component {

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
      </Card>
    );
  }
}
