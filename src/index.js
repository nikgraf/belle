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
import Toggle from './components/Toggle';
import DatePicker from './components/DatePicker';

import buttonStyle from './style/button';
import cardStyle from './style/card';
import placeholderStyle from './style/placeholder';
import optionStyle from './style/option';
import selectStyle from './style/select';
import separatorStyle from './style/separator';
import textInputStyle from './style/text-input';
import toggleStyle from './style/toggle';
import ratingStyle from './style/rating';
import comboBoxStyle from './style/combo-box';
import datePickerStyle from './style/date-picker';

import selectConfig from './config/select';
import buttonConfig from './config/button';
import ratingConfig from './config/rating';
import toggleConfig from './config/toggle';
import i18nConfig from './config/i18n';
import datePickerConfig from './config/datePicker';

module.exports = {
  Button: Button,
  Card: Card,
  Choice: Choice,
  Option: Option,
  Placeholder: Placeholder,
  Select: Select,
  Separator: Separator,
  TextInput: TextInput,
  Rating: Rating,
  ComboBox: ComboBox,
  Toggle: Toggle,
  DatePicker: DatePicker,
  style: {
    button: buttonStyle,
    card: cardStyle,
    option: optionStyle,
    placeholder: placeholderStyle,
    rating: ratingStyle,
    select: selectStyle,
    separator: separatorStyle,
    textInput: textInputStyle,
    toggle: toggleStyle,
    comboBox: comboBoxStyle,
    datePickerStyle: datePickerStyle,
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
