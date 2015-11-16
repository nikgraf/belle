import React from 'react';
import {InfoTip} from 'belle';

export default React.createClass({

  render() {
    return (
      <div>
        <div data-infotip-id="targer">Teting if my infotip works</div>
        <InfoTip position='left' targetId="targer">Testing my react component.</InfoTip>
      </div>
    );
  }
});
