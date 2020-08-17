import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import flag from 'country-code-emoji';
import { ISO_COUNTRY_CODE_TO_NAME } from '../../utils/country-codes';
import {
  parsePhoneNumberFromString,
  PhoneNumber,
  getCountryCallingCode,
  CountryCallingCode,
  CountryCode,
} from 'libphonenumber-js';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { CountrySelectComponent } from './country-select/country-select.component';

export interface CountryInfo {
  emoji: string;
  code: CountryCode;
  name: string;
  numberCode: CountryCallingCode;
}

@Component({
  selector: 'ui-phone-input',
  templateUrl: './ui-phone-input.component.html',
  styleUrls: ['./ui-phone-input.component.scss'],
})
export class UiPhoneInputComponent implements OnInit, OnChanges, OnDestroy {
  private readonly defaultCountry = 'US';

  @Input() country: PhoneNumber['country'] = this.defaultCountry;
  @Input() value: string;
  @Input() placeholder: string;
  @Input() noResultsText = 'No Results';

  @Output() ionChangePhoneNumber = new EventEmitter<
    UiPhoneInputComponent['_valueToEmit']['value']
  >();
  @Output() ionChangeValidity = new EventEmitter<boolean>();
  @Output() ionChangeCountry = new EventEmitter<PhoneNumber['country']>();

  public _value = new BehaviorSubject<PhoneNumber['number'] | undefined>(
    undefined
  );

  public _valueToEmit = new BehaviorSubject<PhoneNumber['number'] | undefined>(
    undefined
  );

  public _country = new BehaviorSubject<PhoneNumber['country']>(undefined);

  public countryNamesByIsoCode = ISO_COUNTRY_CODE_TO_NAME;
  public emojiRefByIsoCode: Record<string, string>;

  public countryInfo?: CountryInfo;
  public iterableCountryInfos: CountryInfo[] = [];

  private countrySubscription: Subscription;
  private countryEmitCounter = 0;

  constructor(private popover: PopoverController) {}

  ngOnInit() {
    this.emojiRefByIsoCode = Object.keys(this.countryNamesByIsoCode).reduce<
      UiPhoneInputComponent['emojiRefByIsoCode']
    >((map, code) => {
      map[code] = flag(code);
      this.iterableCountryInfos.push({
        emoji: map[code],
        name: this.countryNamesByIsoCode[code],
        code: <CountryCode>code,
        numberCode: getCountryCallingCode(<CountryCode>code),
      });
      return map;
    }, {});

    this.countrySubscription = this._country
      .asObservable()
      .subscribe((_code) => {
        const code = _code ?? this.defaultCountry;

        if (this.countryEmitCounter !== 0) {
          this.ionChangeCountry.emit(code);
        }

        this.countryInfo = {
          emoji: this.emojiRefByIsoCode[code],
          name: this.countryNamesByIsoCode[code],
          code,
          numberCode: getCountryCallingCode(code),
        };

        this.countryEmitCounter++;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value || changes.country) {
      if (this.value) {
        this.parse();
      } else {
        this.resetFields();
      }
    }

    if (
      ((changes.value && !changes.value.isFirstChange()) ||
        (changes.country && !changes.country.isFirstChange())) &&
      this._value.value !== this.value
    ) {
      this.ionChangePhoneNumber.emit(this._valueToEmit.value);
    }

    if (!this._country.value) {
      this._country.next(this.defaultCountry);
    }

    if (changes.country && this.country) {
      this._country.next(this.country);
    }
  }

  ngOnDestroy() {
    this.countrySubscription.unsubscribe();
  }

  change(event: CustomEvent) {
    if (event.detail.value) {
      this.parse(event.detail.value);
    } else {
      this.resetFields();
      this.ionChangeValidity.emit(false);
    }
    this.ionChangePhoneNumber.emit(this._valueToEmit.value);
  }

  async openCountrySelect(event: Event) {
    const popover = await this.popover.create({
      component: CountrySelectComponent,
      componentProps: {
        noResultsText: this.noResultsText,
        countries: this.iterableCountryInfos,
        selected: this.countryInfo,
        ionChange: {
          emit: (countryInfo: CountryInfo) => {
            this._country.next(countryInfo.code);
            if (this._value.value) {
              this.parse(this._value.value.toString());
            }
            this.ionChangePhoneNumber.emit(this._valueToEmit.value);
          },
        },
      },
      cssClass: 'country-popover',
      event,
      showBackdrop: false,
      animated: false,
    });

    return popover.present();
  }

  private parse(value = this.value) {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      value,
      this._country.value
    );

    this._value.next(parsedPhoneNumber?.nationalNumber);
    this._valueToEmit.next(parsedPhoneNumber?.number);

    if (parsedPhoneNumber) {
      this._country.next(parsedPhoneNumber.country);
    }

    this.ionChangeValidity.emit(!!parsedPhoneNumber?.isValid());
  }

  private resetFields() {
    this._value.next(undefined);
    this._valueToEmit.next(undefined);
  }
}
