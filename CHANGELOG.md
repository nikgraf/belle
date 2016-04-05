# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## To Be Released

## 2.0.7 - 2016-04-05

Due connection issues to NPM I republished it.

## 2.0.6 - 2016-04-05

### Fixed
- [Rating] Fixed an issue in Safari where selecting a rating was not possible [#277](https://github.com/nikgraf/belle/issues/277)

## 2.0.5 - 2016-03-28

### Changed
- [All Components] Changed internal ID generation to make Belle compatible to React 15.

### Fixed
- [Combobox] Clicking on an filtered option now picks the correct entry [#269](https://github.com/nikgraf/belle/issues/269)

## 2.0.4 - 2016-02-16

### Changed
- [Button, ComboBox, DatePicker, Rating, Select, TextInput, Toggle] Improved rendering performance by binding the functions to the class instantiation instead of every render due binding in JSX. Find more info [here](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#lists-of-items) [#263](https://github.com/nikgraf/belle/pull/263) & [#265](https://github.com/nikgraf/belle/pull/265)

### Fixed

- [DatePicker] use nextMonthNavProps.className for next month (was prevMonthNavProps before) [b9937bb](https://github.com/nikgraf/belle/commit/b9937bbb96925899cb48bf55558119ad72cf2021)
- [DatePicker] fix broken Keyboard navigation in Firefox 39.0 and properly parse Date when jumping from January 2016 to December 2015 via keyboard in Chrome 48 [#264](https://github.com/nikgraf/belle/pull/264)

## 2.0.3 - 2015-12-07

### Fixed

- [Select] Ensure the exact same markup is generated every time the element is rendered [#155](https://github.com/nikgraf/belle/issues/155#issuecomment-162403607)

## 2.0.2 - 2015-12-06

### Fixed

- [Button, ComboBox, DatePicker, Rating, Select, TextInput, Toggle] Fix styling issues when the component has a complex React id generated through API's like `createFragment` [c73d06d](https://github.com/nikgraf/belle/commit/c73d06d9ec6f47661657b42e86a6c3a75cc0dc70)

## 2.0.0 - 2015-11-28

### Changed
- Require React 0.14.0 [#189](https://github.com/nikgraf/belle/issues/189)
- [Button, Card, Choice, ComboBox, Option, Placeholder, Rating, Select, Separator, TextInput, Toggle] Removed the 'Belle ' prefix from displayName
- [Button] Prevent sticky hover for touch devices by leveraging mouseEnter & mouseLeave instead of the :hover pseudo class [8f590e2](https://github.com/nikgraf/belle/commit/8f590e27bf0da53828ff7d8fdac32d759e480aa5)
- [Toggle] Hide Webkit tap highlight on touch [5faf2c5](https://github.com/nikgraf/belle/commit/5faf2c56a05f461b20795fc4c097d5259aca3e54)

### Added
- [DatePicker] Add DatePicker component

```
<DatePicker />
```

- [Spinner] Add Spinner component

```
<Spinner />
```

### Fixed
- [Rating] Fix styling the wrapper [82087cb](https://github.com/nikgraf/belle/commit/82087cb220253486e31269c8a989e9cf26fec18e)
- [Select] Fix rendering the selected option with a falsy value e.g. 0 [f0e5611](https://github.com/nikgraf/belle/commit/f0e5611cfce2da3833ed50bd7ac542501ae2999a)
- [Select] Fix hovering and selecting Options with values of type Number [09c52e3](https://github.com/nikgraf/belle/commit/09c52e3ad9f515218fb6fcc922ffcb55c52809a8)

```
<Select>
  <Option value={ 0 }>Zero</Option>
  <Option value={ 1 }>One</Option>
</Select>
```

- [ComboBox] Fix hovering and selecting Options with values of type Number [64a2797](https://github.com/nikgraf/belle/commit/64a27974ecfa6f327063810484e1150d94276699)
- [TextInput] fix calculating the height in case a defaultValue was provided and props were updated [f1a9bc2](https://github.com/nikgraf/belle/commit/f1a9bc2ee0c3fdb74daf805b854fa0c20a249439)

### Removed
- [Rating] Removed the `resetValue` function. Reseting should accomplished by making the Rating a controlled component and passing in the value as `undefined`. See an example below:

```
export default class extends Component {

  state = {
    ratingValue: 3
  }

  reset() {
    this.setState({ ratingValue: undefined });
  }

  render() {
    return (
      <div>
        <button onClick={ ::this.reset() }></button>
        <Rating value={ this.state.ratingValue } />
      </div>
    );
  }
}
```

## 1.2.2 - 2015-09-04

### Fixed
- Support for React 0.14.0-beta3 [#178](https://github.com/nikgraf/belle/pull/178)
- [Toggle] Fix missing base-styles for Toggle [#179](https://github.com/nikgraf/belle/issues/179)

## 1.2.1 - 2015-08-26

### Fixed
- [Combobox, Select] Improve children manipulation to make Belle work with Radium [#170](https://github.com/nikgraf/belle/issues/170)

## 1.2.0 - 2015-08-19

### Added
- [TextInput] Added minRows and maxRows properties [#146](https://github.com/nikgraf/belle/pull/146)

```
<TextInput minRows={ 5 } placeholder="Please fill in description …">
```

### Fixed
- [Select] Avoid printing a PropTypes warning when a Select has less than 2 children. [#147](https://github.com/nikgraf/belle/issues/147)
- [Select] Allowing to a mix single components together with arrays of components as children. [#161](https://github.com/nikgraf/belle/issues/161)

```
<Select>
  <Placeholder>Choose your City</Placeholder>
  {
    cities.map((city, index) => {
      return (
        <Option key={ index } value={ city.id } >
          { city.name }
        </Option>
      );
    });
  }
</Select>
```

- [ComboBox] Fix detecting isMatchingOption after pressing backspace. [#162](https://github.com/nikgraf/belle/issues/162)

## 1.1.1 - 2015-07-28
### Fixed

- Fix incompatibility with Windows. From now on it doesn't break anymore when doing `npm install belle`. [#20](https://github.com/nikgraf/belle/issues/20)

## 1.1.0 - 2015-07-28
### Added
- [ComboBox] The onUpdate callback now includes 3 more properties in the argument.  [#146](https://github.com/nikgraf/belle/pull/146)

```
onUpdate({
  value: value string,
  identifier: identifier of the type you passed,
  isMatchingOption: true/false,
  isOptionSelection: true/false
})
```

### Changed
- Instead of using a copy of React 0.13.3 to create Markup for custom styles now the locally installed React version is used. [#150](https://github.com/nikgraf/belle/pull/150)

### Fixed
- Fix server-side rendering of Belle components by preventing to inject styles into the DOM without being available. [#150](https://github.com/nikgraf/belle/pull/150)
- [TextInput] When rendered on the server the TextInput will have a height of 0px instead of throwing an exception. [#157](https://github.com/nikgraf/belle/pull/157)

## 1.0.2 - 2015-07-23
### Fixed
- [ComboBox] Filtered options are now updated when the ComboBox receives new props. [#141](https://github.com/nikgraf/belle/issues/141)

## 1.0.1 - 2015-07-20
### Fixed
- [ComboBox] Avoid exception when no Options children are supplied to ComboBox. [#136](https://github.com/nikgraf/belle/issues/136)

## 1.0.0 - 2015-07-15
### Released the first version of Belle
