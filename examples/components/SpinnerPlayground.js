import React from 'react';
import Spinner from '../../belle-classic/Spinner';
import Button from '../../belle-classic/Button';
import Card from '../../belle-classic/Card';

export default React.createClass({
  render() {
    return (
      <Card>
        <h2>Spinner</h2>

        <Spinner />

        <p style={{ fontSize: 20, color: '#666' }}>
          Loading <Spinner characterStyle={{ fontSize: 20 }} />
        </p>

        <Button primary>
          Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
        </Button>

        <Button style={{ marginLeft: 10 }}>
          Saving <Spinner characterStyle={{ fontSize: 18 }} />
        </Button>

      </Card>
    );
  },
});
