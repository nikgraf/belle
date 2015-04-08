"use strict";

/* jslint node: true */

import Button from './components/Button';
import Card from './components/Card';
import TextInput from './components/TextInput';
import Toggle from './components/Toggle';

import buttonStyle from './style/button';
import cardStyle from './style/card';
import textInputStyle from './style/text-input';

module.exports = {
  Button: Button,
  Card: Card,
  TextInput: TextInput,
  Toggle: Toggle,
  style: {
    button: buttonStyle,
    card: cardStyle,
    textInput: textInputStyle
  }
};
