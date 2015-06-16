"use strict";

/* jslint node: true */

import Button from './components/Button';
import Card from './components/Card';
import Choice from './components/Choice';
import Option from './components/Option';
import Placeholder from './components/Placeholder';
import Rating from './components/Rating';
import Select from './components/Select';
import Separator from './components/Separator';
import TextInput from './components/TextInput';
import Toggle from './components/Toggle';

import buttonStyle from './style/button';
import cardStyle from './style/card';
import placeholderStyle from './style/placeholder';
import optionStyle from './style/option';
import ratingStyle from './style/rating';
import selectStyle from './style/select';
import separatorStyle from './style/separator';
import textInputStyle from './style/text-input';

import selectConfig from './config/select';
import buttonConfig from './config/button';
import ratingConfig from './config/rating';

module.exports = {
  Button: Button,
  Card: Card,
  Choice: Choice,
  Option: Option,
  Placeholder: Placeholder,
  Rating: Rating,
  Select: Select,
  Separator: Separator,
  TextInput: TextInput,
  Toggle: Toggle,
  style: {
    button: buttonStyle,
    card: cardStyle,
    option: optionStyle,
    placeholder: placeholderStyle,
    rating: ratingStyle,
    select: selectStyle,
    separator: separatorStyle,
    textInput: textInputStyle
  },
  config: {
    select: selectConfig,
    button: buttonConfig,
    rating: ratingConfig
  }
};
