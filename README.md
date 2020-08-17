# ui-phone-input

[![npm version](https://badge.fury.io/js/ui-phone-input.svg)](https://badge.fury.io/js/ui-phone-input)

A simple @angular/ionic based phone input component

## Install

    npm install ui-phone-input --save

or

    yarn add ui-phone-input

## Usage

#### Import the `UiPhoneInputModule` in your Module

```typescript
import { UiPhoneInputModule } from 'ui-phone-input';

@NgModule({
  imports: [UiPhoneInputModule],
})
export class Module {}
```

#### Use ui-phone-input component in your template

```html
<ui-phone-input
  [value]="phoneNumber"
  (ionChangePhoneNumber)="phoneNumber = $event"
  (ionChangeValidity)="isValid = $event"
  (ionChangeCountry)="country = $event"
  placeholder="(631) 888-8888"
>
</ui-phone-input>
```

# API

## Inputs

| @Input        | Purpose                                       | Type                                            |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| value         | The telephone number                          | string                                          |
| placeholder   | Input placeholder                             | string                                          |
| country       | Country ISO code                              | string (2 character ISO code, defaults to 'US') |
| noResultsText | Text to be displayed when searching countries | string (Defaults to 'No Results')               |

## Outputs

| @Output              | Purpose                                                          |
| -------------------- | ---------------------------------------------------------------- |
| ionChangePhoneNumber | Triggered when the phone number changes value and can be parsed. |
| ionChangeCountry     | Triggered when the country changes value.                        |
| ionChangeValidity    | Triggered when the phone number validity changes.                |

# Features

- Emoji Based Flag Support
- Emits parsed phone number with country code
- Emits ISO country code
- Automatic search when country dialog is open. Just type to search.

# Nice to Haves / TODOS

- Test coverage
- A11y audit (keyboard controls, etc..)
- Additional internationalization coverage
