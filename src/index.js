import {
  Spinner,
  TextInput,
} from './components/atoms';
import {
  Card,
  Choice,
  Option,
  Placeholder,
} from './components/container';
import {
  Button,
  Separator,
} from './components/molecules';
import {
  ComboBox,
  Rating,
  Select,
  Toggle,
} from './components/organisms';
import { DatePicker } from './components/templates';

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
