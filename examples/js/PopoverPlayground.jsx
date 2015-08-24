import React from 'react';
import {Card, Popover} from 'belle';

export default React.createClass({

  render() {
    return (
      <Card>
        <h2>Popover</h2>

        <h3>Default Popover</h3>
        <Popover>
          Hello Alex <button>Donate!</button><p>Screw alex</p>
        </Popover>

      </Card>
    );
  }
});
