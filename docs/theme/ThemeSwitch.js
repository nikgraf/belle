import React from 'react';
import {Button} from 'belle';
import {Navigation, State} from 'react-router';

export default React.createClass({

  mixins: [State, Navigation],

  _onSwitchTheme(name) {
    window.location.hash = `${this.getPathname()}?theme=${name}`;
    window.location.reload();
  },

  render() {
    const currentTheme = this.getQuery().theme;

    return (
      <div>
        <p>
          You choose between one of the themes below
        </p>

        <div>
          <Button onClick={ () => this._onSwitchTheme('belle') }
                  primary
                  disabled={ currentTheme === 'belle' || currentTheme === undefined }>
            Belle
          </Button>
          <Button onClick={ () => this._onSwitchTheme('bootstrap') }
                  style={{ marginLeft: 10 }}
                  primary
                  disabled={ currentTheme === 'bootstrap' }>
            Bootstrap
          </Button>
          <Button onClick={ () => this._onSwitchTheme('belle-with-default-focus') }
                  style={{ marginLeft: 10 }}
                  primary
                  disabled={ currentTheme === 'belle-with-default-focus' }>
            Belle with default focus behaviour
          </Button>
        </div>
      </div>
    );
  }
});
