import React from 'react/addons';
import {Toggle, Choice, Card} from 'belle';

export default React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState () {
    return {
      active: true
    };
  },

  render () {
    return (
      <Card>
        <h2>Toggle</h2>

        <h3>Default Toggle</h3>
        <Toggle />

        <h3>Default value=true Toggle</h3>
        <Toggle value={true} />

        <h3>Default value=false Toggle</h3>
        <Toggle value={false} />

        <h3>defaultValue=true Toggle (defaultValue)</h3>
        <Toggle defaultValue={true} />

        <h3>DefaultValue=false Toggle (defaultValue)</h3>
        <Toggle defaultValue={false} />

        <h3>Default Toggle (valueLink)</h3>
        <Toggle valueLink={this.linkState('active')} />
        <div>{ `active: ${this.state.active}` }</div>

        <h3>Custom Toggle</h3>
        <Toggle defaultValue={ true }>
          <Choice value={ true }>On</Choice>
          <Choice value={ false }>Off</Choice>
        </Toggle>

        <h3>Disabled Toggle</h3>
        <Toggle disabled />
        <Toggle disabled defaultValue />

      </Card>
    );
  }
});
