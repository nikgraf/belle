import Button from './components/Button';
import Card from './components/Card';
import Choice from './components/Choice';
import Option from './components/Option';
import Placeholder from './components/Placeholder';
import Select from './components/Select';
import Separator from './components/Separator';
import TextInput from './components/TextInput';
import Rating from './components/Rating';
import ComboBox from './components/ComboBox';
import Spinner from './components/Spinner';
import Toggle from './components/Toggle';
import DatePicker from './components/DatePicker';

import {
  actionAreaStyle,
  buttonStyle,
  cardStyle,
  comboBoxStyle,
  datePickerStyle,
  optionStyle,
  placeholderStyle,
  ratingStyle,
  selectStyle,
  separatorStyle,
  spinnerStyle,
  textInputStyle,
  toggleStyle
} from './style';

import {
  buttonConfig,
  datePickerConfig,
  i18nConfig,
  ratingConfig,
  selectConfig,
  toggleConfig
} from './config';

module.exports = {
  Button,
  Card,
  Choice,
  Option,
  Placeholder,
  Select,
  Separator,
  TextInput,
  Rating,
  ComboBox,
  Spinner,
  Toggle,
  DatePicker,
  style: {
    actionArea: actionAreaStyle,
    button: buttonStyle,
    card: cardStyle,
    comboBox: comboBoxStyle,
    datePicker: datePickerStyle,
    option: optionStyle,
    placeholder: placeholderStyle,
    rating: ratingStyle,
    select: selectStyle,
    separator: separatorStyle,
    spinner: spinnerStyle,
    textInput: textInputStyle,
    toggle: toggleStyle,
  },
  config: {
    select: selectConfig,
    button: buttonConfig,
    rating: ratingConfig,
    toggle: toggleConfig,
    i18n: i18nConfig,
    datePicker: datePickerConfig,
  },
};
