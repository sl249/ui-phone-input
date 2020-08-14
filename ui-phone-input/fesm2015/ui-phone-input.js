import { EventEmitter, Component, ElementRef, Input, Output, NgModule } from '@angular/core';
import { PopoverController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
import flag from 'country-code-emoji';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { fromEvent, BehaviorSubject } from 'rxjs';

// commented out ISO codes not recognized
const ISO_COUNTRY_CODE_TO_NAME = {
    AF: 'Afghanistan',
    AL: 'Albania',
    DZ: 'Algeria',
    AS: 'American Samoa',
    AD: 'Andorra',
    AO: 'Angola',
    AI: 'Anguilla',
    // AQ: 'Antarctica',
    AG: 'Antigua and Barbuda',
    AR: 'Argentina',
    AM: 'Armenia',
    AW: 'Aruba',
    AU: 'Australia',
    AT: 'Austria',
    AZ: 'Azerbaijan',
    BS: 'Bahamas (the)',
    BH: 'Bahrain',
    BD: 'Bangladesh',
    BB: 'Barbados',
    BY: 'Belarus',
    BE: 'Belgium',
    BZ: 'Belize',
    BJ: 'Benin',
    BM: 'Bermuda',
    BT: 'Bhutan',
    BO: 'Bolivia (Plurinational State of)',
    BQ: 'Bonaire, Sint Eustatius and Saba',
    BA: 'Bosnia and Herzegovina',
    BW: 'Botswana',
    // BV: 'Bouvet Island',
    BR: 'Brazil',
    IO: 'British Indian Ocean Territory (the)',
    BN: 'Brunei Darussalam',
    BG: 'Bulgaria',
    BF: 'Burkina Faso',
    BI: 'Burundi',
    CV: 'Cabo Verde',
    KH: 'Cambodia',
    CM: 'Cameroon',
    CA: 'Canada',
    KY: 'Cayman Islands (the)',
    CF: 'Central African Republic (the)',
    TD: 'Chad',
    CL: 'Chile',
    CN: 'China',
    CX: 'Christmas Island',
    CC: 'Cocos (Keeling) Islands (the)',
    CO: 'Colombia',
    KM: 'Comoros (the)',
    CD: 'Congo (the Democratic Republic of the)',
    CG: 'Congo (the)',
    CK: 'Cook Islands (the)',
    CR: 'Costa Rica',
    HR: 'Croatia',
    CU: 'Cuba',
    CW: 'Curaçao',
    CY: 'Cyprus',
    CZ: 'Czechia',
    CI: "Côte d'Ivoire",
    DK: 'Denmark',
    DJ: 'Djibouti',
    DM: 'Dominica',
    DO: 'Dominican Republic (the)',
    EC: 'Ecuador',
    EG: 'Egypt',
    SV: 'El Salvador',
    GQ: 'Equatorial Guinea',
    ER: 'Eritrea',
    EE: 'Estonia',
    SZ: 'Eswatini',
    ET: 'Ethiopia',
    FK: 'Falkland Islands (the) [Malvinas]',
    FO: 'Faroe Islands (the)',
    FJ: 'Fiji',
    FI: 'Finland',
    FR: 'France',
    GF: 'French Guiana',
    PF: 'French Polynesia',
    // TF: 'French Southern Territories (the)',
    GA: 'Gabon',
    GM: 'Gambia (the)',
    GE: 'Georgia',
    DE: 'Germany',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GR: 'Greece',
    GL: 'Greenland',
    GD: 'Grenada',
    GP: 'Guadeloupe',
    GU: 'Guam',
    GT: 'Guatemala',
    GG: 'Guernsey',
    GN: 'Guinea',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HT: 'Haiti',
    // HM: 'Heard Island and McDonald Islands',
    VA: 'Holy See (the)',
    HN: 'Honduras',
    HK: 'Hong Kong',
    HU: 'Hungary',
    IS: 'Iceland',
    IN: 'India',
    ID: 'Indonesia',
    IR: 'Iran (Islamic Republic of)',
    IQ: 'Iraq',
    IE: 'Ireland',
    IM: 'Isle of Man',
    IL: 'Israel',
    IT: 'Italy',
    JM: 'Jamaica',
    JP: 'Japan',
    JE: 'Jersey',
    JO: 'Jordan',
    KZ: 'Kazakhstan',
    KE: 'Kenya',
    KI: 'Kiribati',
    KP: "Korea (the Democratic People's Republic of)",
    KR: 'Korea (the Republic of)',
    KW: 'Kuwait',
    KG: 'Kyrgyzstan',
    LA: "Lao People's Democratic Republic (the)",
    LV: 'Latvia',
    LB: 'Lebanon',
    LS: 'Lesotho',
    LR: 'Liberia',
    LY: 'Libya',
    LI: 'Liechtenstein',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    MO: 'Macao',
    MG: 'Madagascar',
    MW: 'Malawi',
    MY: 'Malaysia',
    MV: 'Maldives',
    ML: 'Mali',
    MT: 'Malta',
    MH: 'Marshall Islands (the)',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MU: 'Mauritius',
    YT: 'Mayotte',
    MX: 'Mexico',
    FM: 'Micronesia (Federated States of)',
    MD: 'Moldova (the Republic of)',
    MC: 'Monaco',
    MN: 'Mongolia',
    ME: 'Montenegro',
    MS: 'Montserrat',
    MA: 'Morocco',
    MZ: 'Mozambique',
    MM: 'Myanmar',
    NA: 'Namibia',
    NR: 'Nauru',
    NP: 'Nepal',
    NL: 'Netherlands (the)',
    NC: 'New Caledonia',
    NZ: 'New Zealand',
    NI: 'Nicaragua',
    NE: 'Niger (the)',
    NG: 'Nigeria',
    NU: 'Niue',
    NF: 'Norfolk Island',
    MP: 'Northern Mariana Islands (the)',
    NO: 'Norway',
    OM: 'Oman',
    PK: 'Pakistan',
    PW: 'Palau',
    PS: 'Palestine, State of',
    PA: 'Panama',
    PG: 'Papua New Guinea',
    PY: 'Paraguay',
    PE: 'Peru',
    PH: 'Philippines (the)',
    // PN: 'Pitcairn',
    PL: 'Poland',
    PT: 'Portugal',
    PR: 'Puerto Rico',
    QA: 'Qatar',
    MK: 'Republic of North Macedonia',
    RO: 'Romania',
    RU: 'Russian Federation (the)',
    RW: 'Rwanda',
    RE: 'Réunion',
    BL: 'Saint Barthélemy',
    SH: 'Saint Helena, Ascension and Tristan da Cunha',
    KN: 'Saint Kitts and Nevis',
    LC: 'Saint Lucia',
    MF: 'Saint Martin (French part)',
    PM: 'Saint Pierre and Miquelon',
    VC: 'Saint Vincent and the Grenadines',
    WS: 'Samoa',
    SM: 'San Marino',
    ST: 'Sao Tome and Principe',
    SA: 'Saudi Arabia',
    SN: 'Senegal',
    RS: 'Serbia',
    SC: 'Seychelles',
    SL: 'Sierra Leone',
    SG: 'Singapore',
    SX: 'Sint Maarten (Dutch part)',
    SK: 'Slovakia',
    SI: 'Slovenia',
    SB: 'Solomon Islands',
    SO: 'Somalia',
    ZA: 'South Africa',
    // GS: 'South Georgia and the South Sandwich Islands',
    SS: 'South Sudan',
    ES: 'Spain',
    LK: 'Sri Lanka',
    SD: 'Sudan (the)',
    SR: 'Suriname',
    SJ: 'Svalbard and Jan Mayen',
    SE: 'Sweden',
    CH: 'Switzerland',
    SY: 'Syrian Arab Republic',
    TW: 'Taiwan',
    TJ: 'Tajikistan',
    TZ: 'Tanzania, United Republic of',
    TH: 'Thailand',
    TL: 'Timor-Leste',
    TG: 'Togo',
    TK: 'Tokelau',
    TO: 'Tonga',
    TT: 'Trinidad and Tobago',
    TN: 'Tunisia',
    TR: 'Turkey',
    TM: 'Turkmenistan',
    TC: 'Turks and Caicos Islands (the)',
    TV: 'Tuvalu',
    UG: 'Uganda',
    UA: 'Ukraine',
    AE: 'United Arab Emirates (the)',
    GB: 'United Kingdom of Great Britain and Northern Ireland (the)',
    // UM: 'United States Minor Outlying Islands (the)',
    US: 'United States of America (the)',
    UY: 'Uruguay',
    UZ: 'Uzbekistan',
    VU: 'Vanuatu',
    VE: 'Venezuela (Bolivarian Republic of)',
    VN: 'Viet Nam',
    VG: 'Virgin Islands (British)',
    VI: 'Virgin Islands (U.S.)',
    WF: 'Wallis and Futuna',
    EH: 'Western Sahara',
    YE: 'Yemen',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',
    AX: 'Åland Islands',
};

class CountrySelectComponent {
    constructor(el) {
        this.el = el;
        this.ionChange = new EventEmitter();
        this.searchString = '';
    }
    ngOnInit() {
        this.keySubscription = fromEvent(document, 'keydown').subscribe((e) => {
            if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                this.selectAll = true;
            }
            if (e.key.length === 1) {
                this.searchString = `${this.searchString}${e.key}`;
            }
            if (e.key === 'Backspace' && this.searchString.length) {
                this.searchString = this.selectAll
                    ? ''
                    : this.searchString.slice(0, this.searchString.length - 1);
                this.selectAll = false;
            }
            this.filter();
        });
    }
    ngAfterViewInit() {
        const selectedItem = this.el.nativeElement.querySelector(`#${this.selected.code}`);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.scrollIntoView();
            selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.focus();
        }), 500);
    }
    ngOnDestroy() {
        var _a;
        (_a = this.keySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    filter() {
        this.filteredCountries = !this.searchString
            ? undefined
            : this.countries.filter((country) => country.name.toLowerCase().includes(this.searchString.toLowerCase()));
    }
}
CountrySelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'country-select',
                template: "<ion-list>\n  <ion-item\n    *ngFor=\"let country of filteredCountries ? filteredCountries : countries\"\n    (click)=\"ionChange.emit(country); popover.dismiss()\"\n    [button]=\"true\"\n    lines=\"none\"\n    [id]=\"country.code\"\n  >\n    <ion-row class=\"ion-justify-content-between ion-align-items-center\">\n      <ion-row class=\"ion-align-items-center\">\n        <span class=\"flag ion-margin-end\">{{ country.emoji }}</span>\n        {{ country.name }}\n      </ion-row>\n      <span class=\"code\">+{{ country.numberCode }}</span>\n    </ion-row>\n  </ion-item>\n  <ion-row class=\"no-results\" *ngIf=\"filteredCountries?.length === 0\">\n    {{ noResultsText }}\n  </ion-row>\n</ion-list>\n",
                styles: [":host{display:contents;position:relative}:host ion-item{font-size:14px}:host ion-item .flag{font-size:24px}:host ion-item>ion-row{flex:1;flex-wrap:nowrap}:host ion-item>ion-row>ion-row{flex-wrap:nowrap}:host ion-item .code{font-weight:500;opacity:.64}:host .no-results{align-items:center;cursor:not-allowed;justify-content:center;min-height:100px;opacity:.32}"]
            },] }
];
CountrySelectComponent.ctorParameters = () => [
    { type: ElementRef }
];
CountrySelectComponent.propDecorators = {
    countries: [{ type: Input }],
    selected: [{ type: Input }],
    noResultsText: [{ type: Input }],
    ionChange: [{ type: Output }]
};

class UiPhoneInputComponent {
    constructor(popover) {
        this.popover = popover;
        this.defaultCountry = 'US';
        this.country = this.defaultCountry;
        this.noResultsText = 'No Results';
        this.ionChangePhoneNumber = new EventEmitter();
        this.ionChangeValidity = new EventEmitter();
        this._value = new BehaviorSubject(undefined);
        this._valueToEmit = new BehaviorSubject(undefined);
        this._country = new BehaviorSubject(undefined);
        this.countryNamesByIsoCode = ISO_COUNTRY_CODE_TO_NAME;
        this.iterableCountryInfos = [];
    }
    ngOnInit() {
        this.emojiRefByIsoCode = Object.keys(this.countryNamesByIsoCode).reduce((map, code) => {
            map[code] = flag(code);
            this.iterableCountryInfos.push({
                emoji: map[code],
                name: this.countryNamesByIsoCode[code],
                code: code,
                numberCode: getCountryCallingCode(code),
            });
            return map;
        }, {});
        this.countrySubscription = this._country
            .asObservable()
            .subscribe((_code) => {
            const code = _code !== null && _code !== void 0 ? _code : this.defaultCountry;
            this.countryInfo = {
                emoji: this.emojiRefByIsoCode[code],
                name: this.countryNamesByIsoCode[code],
                code,
                numberCode: getCountryCallingCode(code),
            };
        });
    }
    ngOnChanges(changes) {
        console.log(changes);
        if (changes.value || changes.country) {
            if (this.value) {
                this.parse();
            }
            else {
                this.resetFields();
            }
        }
        if (((changes.value && !changes.value.isFirstChange()) ||
            (changes.country && !changes.country.isFirstChange())) &&
            this._value.value !== this.value) {
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
    change(event) {
        if (event.detail.value) {
            this.parse(event.detail.value);
        }
        else {
            this.resetFields();
            this.ionChangeValidity.emit(false);
        }
        this.ionChangePhoneNumber.emit(this._valueToEmit.value);
    }
    openCountrySelect(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const popover = yield this.popover.create({
                component: CountrySelectComponent,
                componentProps: {
                    noResultsText: this.noResultsText,
                    countries: this.iterableCountryInfos,
                    selected: this.countryInfo,
                    ionChange: {
                        emit: (countryInfo) => {
                            console.log('emit');
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
        });
    }
    parse(value = this.value) {
        const parsedPhoneNumber = parsePhoneNumberFromString(value, this._country.value);
        this._value.next(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.nationalNumber);
        this._valueToEmit.next(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.number);
        if (parsedPhoneNumber) {
            this._country.next(parsedPhoneNumber.country);
        }
        this.ionChangeValidity.emit(!!(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.isValid()));
    }
    resetFields() {
        this._value.next(undefined);
        this._valueToEmit.next(undefined);
    }
}
UiPhoneInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-phone-input',
                template: "<ion-item>\n  <ion-button fill=\"clear\" (click)=\"openCountrySelect($event)\">\n    {{ countryInfo?.emoji }}\n    <ion-icon name=\"caret-down-sharp\" slot=\"end\" color=\"dark\"> </ion-icon>\n    <ion-text color=\"dark\" class=\"ion-margin-start\">\n      +{{ countryInfo?.numberCode }}\n    </ion-text>\n  </ion-button>\n  <!-- <ion-select\n      [value]=\"countryInfo?.code\"\n      (ionChange)=\"changeCountry($event)\"\n      interface=\"popover\"\n    >\n      <ion-searchbar></ion-searchbar>\n      <ion-select-option\n        [value]=\"_countryInfo.code\"\n        *ngFor=\"let _countryInfo of iterableCountryInfos\"\n      >\n        {{ _countryInfo.emoji }}\n        {{ _countryInfo.name }}\n        +{{ _countryInfo.numberCode }}\n      </ion-select-option>\n    </ion-select> -->\n  <ion-input\n    [value]=\"_value.value\"\n    (ionChange)=\"change($event)\"\n    [placeholder]=\"placeholder\"\n  >\n  </ion-input>\n</ion-item>\n",
                styles: [":host{display:block}:host ion-item{--padding-start:0}:host ion-item>ion-button{--border-radius:0;font-size:24px;height:100%;margin:0}:host ion-item>ion-button ion-icon,:host ion-item>ion-button ion-text{font-size:14px}"]
            },] }
];
UiPhoneInputComponent.ctorParameters = () => [
    { type: PopoverController }
];
UiPhoneInputComponent.propDecorators = {
    country: [{ type: Input }],
    value: [{ type: Input }],
    placeholder: [{ type: Input }],
    noResultsText: [{ type: Input }],
    ionChangePhoneNumber: [{ type: Output }],
    ionChangeValidity: [{ type: Output }]
};

const components = [UiPhoneInputComponent, CountrySelectComponent];
class UiPhoneInputModule {
}
UiPhoneInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...components],
                imports: [IonicModule, CommonModule],
                exports: [...components],
                entryComponents: [],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CountrySelectComponent, ISO_COUNTRY_CODE_TO_NAME, UiPhoneInputComponent, UiPhoneInputModule };
//# sourceMappingURL=ui-phone-input.js.map
