import React, {Component} from 'react';
import {style} from 'belle';
import {config} from 'belle';
import {extend} from 'underscore';
import ButtonPlayground from './ButtonPlayground';
import CardPlayground from './CardPlayground';
import ModalPlayground from './ModalPlayground';
import SelectPlayground from './SelectPlayground';
import TextInputPlayground from './TextInputPlayground';
import RatingPlayground from './RatingPlayground';
import ComboBoxPlayground from './ComboBoxPlayground';
import TogglePlayground from './TogglePlayground';
import Modal from 'react-modal';

// TODO create a button to switch between those stylings for testing purposes
if (true) {
  config.button.preventFocusStyleForTouchAndClick = false;
  style.button.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0
  };
  style.button.primaryFocusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0
  };

  config.rating.preventFocusStyleForTouchAndClick = false;
  style.rating.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0,
    borderRadius: 3
  };

  config.toggle.preventFocusStyleForTouchAndClick = false;
  style.toggle.focusStyle = {
    boxShadow: '0 0 0 3px rgba(140, 224, 255, 0.6)',
    outline: 0
  };

  config.select.shouldPositionOptions = false;
} else {
  style.button.style = {
    boxSizing: 'border-box',
    borderRadius: 2,
    cursor: 'pointer',
    padding: '8px 12px 6px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    background: 'red',
    border: '1px solid #EFEFEF',
    borderBottomColor: '#D0D0D0',
    color: 'brown',
    verticalAlign: 'bottom',
    lineHeight: '26px'
  };

  style.card.style = extend(style.card.style, {
    border: '1px solid black'
  });

  style.textInput.style = extend(style.textInput.style, {
    color: 'blue'
  });
}

// export for http://fb.me/react-devtools
window.React = React;

const appElement = document.getElementById('react');

Modal.setAppElement(appElement);
Modal.injectCSS();

class App extends Component {

  render() {
    return (<div style={ {margin: '0 auto', width: 300} }>
        <h1>Belle Playground</h1>

        <Modal
          isOpen
        >
          <h2>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>

        <TogglePlayground />

        <SelectPlayground />

        <ButtonPlayground />

        <ModalPlayground />

        <TextInputPlayground />

        <CardPlayground />

        <RatingPlayground />

        <ComboBoxPlayground />

      </div>);
  }
}

React.render(<App/>, appElement);
