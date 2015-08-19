# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## To Be Released
- Avoid printing a PropTypes warning when a Select has less than 2 children. [#147](https://github.com/nikgraf/belle/issues/147)
- Allowing to mix single components together with arrays of components as children.

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

[#161](https://github.com/nikgraf/belle/issues/161)
- Fix detecting isMatchingOption after pressing backspace.
[#162](https://github.com/nikgraf/belle/issues/162)

## 1.1.1 - 2015-07-28
### Fixed

- Fix incompatibility with Windows. From now on it doesn't break anymore when doing `npm install belle`. [#20](https://github.com/nikgraf/belle/issues/20)

## 1.1.0 - 2015-07-28
### Added
- [Combobox] The onUpdate callback now includes 3 more properties in the argument.  [#146](https://github.com/nikgraf/belle/pull/146)

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
- [Combobox] Filtered options are now updated when the ComboBox receives new props. [#141](https://github.com/nikgraf/belle/issues/141)

## 1.0.1 - 2015-07-20
### Fixed
- [ComboBox] Avoid exception when no Options children are supplied to ComboBox. [#136](https://github.com/nikgraf/belle/issues/136)

## 1.0.0 - 2015-07-15
### Released the first version of Belle
