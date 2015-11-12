# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## To Be Released

### Changed
- Require React 0.14.0 [#189](https://github.com/nikgraf/belle/issues/189)
- [Button, Card, Choice, ComboBox, Option, Placeholder, Rating, Select, Separator, TextInput, Toggle] Removed the 'Belle ' prefix from displayName

### Fixed
- [Rating] Fix styling the wrapper [82087cb](https://github.com/nikgraf/belle/commit/82087cb220253486e31269c8a989e9cf26fec18e)

### Added
- [DatePicker] Add DatePicker component

```
<DatePicker />
```

- [Spinner] Add Spinner component

```
<Spinner />
```

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
