/* jscs:disable disallowSpacesInsideTemplateStringPlaceholders */

import React from 'react';
import { Button, Spinner } from 'belle';
import Card from 'belle-classic/Card';
import Code from '../Code';
import { propertyNameStyle, propertyDescriptionStyle } from '../../style';

const basicCodeExample = `<!-- basic spinner example -->
<Spinner />`;

const buttonCodeExample = `<!-- loading button example -->
<Button primary disabled>
  Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
</Button>

<Button disabled style={{ marginLeft: 10 }}>
  Saving <Spinner characterStyle={{ fontSize: 18, color: '#C5C4C4' }} />
</Button>`;

const cardCodeExample = `<!-- loading example -->
<Card style={{ fontSize: 20,
               color: '#666',
               textAlign: 'center',
               borderTop: '1px solid #f2f2f2',
            }}>
  Loading <Spinner characterStyle={{ fontSize: 20 }} />
</Card>`;

const SpinnerDocumentation = () => (
  <div>
    <h2 style={{ marginTop: 0, marginBottom: 40 }}>Spinner</h2>

    <Spinner />

    <Code value={ basicCodeExample } style={{ marginTop: 40 }} />

    <h3>Properties</h3>

    <table><tbody>
      <tr>
        <td style={ propertyNameStyle }>
          characterStyle
        </td>
      </tr>
      <tr>
        <td style={ propertyDescriptionStyle }>
          <p>
            <i>Object</i>
            <br />
            optional
          </p>
          <p>
            The property can be used to specify styling for the spans wrapping
            the dots. Behaves like Reacts built-in style property.
          </p>
        </td>
      </tr>
    </tbody></table>

    <p>
      Any property valid for a HTML div like
      <span style={{ color: 'grey' }}> style, id, className, …</span>
    </p>

    <h3>More Examples</h3>

    <h4>Button while loading</h4>

    <Button primary disabled>
      Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
    </Button>

    <Button disabled style={{ marginLeft: 10 }}>
      Saving <Spinner characterStyle={{ fontSize: 18, color: '#C5C4C4' }} />
    </Button>

    <Code value={ buttonCodeExample } style={{ marginTop: 40 }} />

    <h4>Card with a loading indicator</h4>

    <Card style={{ fontSize: 20,
                   color: '#666',
                   textAlign: 'center',
                   borderTop: '1px solid #f2f2f2',
                }}
    >
      Loading <Spinner characterStyle={{ fontSize: 20 }} />
    </Card>

    <Code value={ cardCodeExample } style={{ marginTop: 40 }} />
  </div>
);

export default SpinnerDocumentation;
