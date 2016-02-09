import React, { Component } from 'react';
import { Card } from 'belle';
import Code from '../Code';

const basicCodeExample = `<!-- basic card example -->
<Card style={{ borderTop: '1px solid #f2f2f2' }}>
  Add any content here like paragraphs, images or other components …
</Card>`;

const imageCodeExample = `<!-- image card example -->
<Card style={{ borderTop: '1px solid #f2f2f2',
               width: 265,
               padding: '20px 0' }}>
  <img src="images/ngorongoro_caldera_small.jpg"
       width="100%" />
</Card>`;

export default class CardDocumentation extends Component {

  render() {
    return (
      <div>
        <h2 style={ { marginTop: 0, marginBottom: 40 } }>Card</h2>

        <Card style={{ borderTop: '1px solid #f2f2f2' }}>
          Add any content here like paragraphs, images or other components …
        </Card>

        <Code value={ basicCodeExample } style={ { marginTop: 40 } } />

        <p style={{ marginTop: 40 }}>
          <i>Note</i>: The card is designed to work on non-white areas. To provide a
          nice appearance on white areas please change the box-shadow or borders.
        </p>

        <h3>Properties</h3>

        <p>
          Any property valid for a HTML div like
          <span style={ { color: 'grey' } }> style, id, className, …</span>
        </p>

        <h3>More Examples</h3>

        <h4>Card with a full-width image</h4>

        <Card style={{ borderTop: '1px solid #f2f2f2',
                       width: 265,
                       padding: '20px 0',
                    }}
        >
          <img
            src="images/ngorongoro_caldera_small.jpg"
            width="100%"
          />
        </Card>

        <Code value={ imageCodeExample } style={ { marginTop: 40 } } />
      </div>
    );
  }
}
