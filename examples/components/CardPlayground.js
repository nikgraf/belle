import React from 'react';
import Card from '../../belle-classic/Card';

export default React.createClass({

  render() {
    return (
      <div>
        <h2>Card</h2>

        <Card><p>Looks nice!</p></Card>

        <Card
          className='test'
          data-custom-attribute={'custom'}
        >
          What about another font color?
        </Card>

        <Card>
          <div>Looks nice!</div>
          <div>Even with multiple elements passed</div>
        </Card>

      </div>
    );
  },
});
