import React, { Component } from 'react';

export default class FuturePlans extends Component {

  render() {
    return (<div>
      <h2 style={{ marginTop: 0, marginBottom: 40 }}>Discussion or need help?</h2>

      <p>
        Join us at the <b>#belle</b> channel of the <a href="http://reactiflux.com/">Reactiflux</a> Slack community or our <a href="https://gitter.im/nikgraf/belle">Gitter room</a>.
      </p>

      <p>
        In addition you can ask the community by <a href="http://stackoverflow.com/questions/ask?tags=belle"> posting your question to StackOverflow with the <b>belle</b> tag</a>.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 40 }}>Special Thanks</h2>

      <p>
        Thanks to <a href="https://github.com/andreypopp">Andrey Popp</a> & <a href="https://github.com/eugene1g">Eugene</a> for their inspiring work on
        <a href="https://github.com/andreypopp/react-textarea-autosize"> React TextArea Autosize</a> which
        kind of ignited the idea of Belle.
      </p>
      <p>
        Thanks to Christian Steiner from <a href="http://www.cropd.at/">cropd.at</a> for creating
        the logo and helping out with the design.
      </p>

      <p>
        Special thanks to <a href="https://github.com/jpuri">Jyoti Puri</a> for the tremendous amount of work she put into this endeavor.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 40 }}>Future Plans</h2>

      <p>Components to add: Dateformatter, Datepicker, Tooltip, Popover, Modal, Navigation Menu, NumberInput, EmailInput, Anchor, DropZone
      </p>
    </div>);
  }
}
