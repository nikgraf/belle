import React, {Component} from 'react';

export default class FormComponents extends Component {

  render() {
    return (<div>
      <h2 style={ {marginTop: 0, marginBottom: 40} }>Philosophy</h2>

      <p><i>“Great UX starts with a good UI”</i></p>

      <p>
        With Belle I'm aiming to provide a library that follows a couple well established
        principles. While some of them might not be consider best practice today
        We believe they will become some day in the near future.
      </p>

      <p>This is an early draft &amp; any improvement you can think of is very welcome.</p>

      <h3>Principles</h3>

      <h4>Easy to use</h4>

      <p>
        The most important attribute of any great experience is that there was no hassle to achieve
        the initial goals.
      </p>

      <h4>Consistent Behavior</h4>

      <p>
        Every object someone interacts with has it's own little language. This language
        must be learned by everyone getting in touch with a new set of object. In order
        to provide a great experience the amount to learn should be reduced to a minimum.
      </p>

      <p>
        There are two major personalities to target with Belle. One is the developer.
        For him/her APIs should be provided in a consistent way through all components.
        The other and more important is the users of the components. Every color,
        animation or behavior should be aligned with the other components to provide
        a great experience.
      </p>

      <h4>Encapsulate Styles</h4>

      <p>
        There is no reason while a style designed one specific element should affect
        others. In CSS styles are often defined by overwriting previous ones and introducing
        deeper and deeper nesting. Once nesting is introduced resolution of styles for one
        specific element is not a trivial task anymore. Due this managing CSS dependencies
        is hard. It is hard to predict how an application looks like after updating or
        removing dependency.
      </p>

      <p>
        That's why with Belle styles should apply to the components themselves in the DOM.
        By doing so the visual appearance and business logic are combined in location.
      </p>

      <h4>Every Interaction is followed up with Feedback</h4>

      <p>
        Let people know how their behavior affects the system. It assures them that
        their input was acknowledged which provides them with a feeling of control over
        the system.
      </p>

      <h4>High Performance</h4>

      <p>
        The user should see affects of his actions instantly. Any delay can cause confusion
        and frustration. While instant certainly is not always possible Belle strives to
        provide an experience close to instant.
      </p>

    </div>);
  }
}
