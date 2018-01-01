import { Button } from './components/Button';
import { Card } from './components/Card';
import { Choice } from './components/Choice';
import { ComboBox } from './components/ComboBox';
import { DatePicker } from './components/DatePicker';
import { Option } from './components/Option';
import { Placeholder } from './components/Placeholder';
import { Rating } from './components/Rating';
import { Select } from './components/Select';
import { Separator } from './components/Separator';
import { Spinner } from './components/Spinner';
import { TextInput } from './components/TextInput';
import { Toggle } from './components/Toggle';

import {
  buttonConfig,
  datePickerConfig,
  i18nConfig,
  ratingConfig,
  selectConfig,
  toggleConfig
} from './config';

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

module.exports = {
  Button,
  Card,
  Choice,
  ComboBox,
  DatePicker,
  Option,
  Placeholder,
  Rating,
  Select,
  Separator,
  Spinner,
  TextInput,
  Toggle,
  config: {
    button: buttonConfig,
    datePicker: datePickerConfig,
    i18n: i18nConfig,
    rating: ratingConfig,
    select: selectConfig,
    toggle: toggleConfig,
  },
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
};
