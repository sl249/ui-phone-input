(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ionic/angular'), require('@angular/common'), require('country-code-emoji'), require('libphonenumber-js'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ui-phone-input', ['exports', '@angular/core', '@ionic/angular', '@angular/common', 'country-code-emoji', 'libphonenumber-js', 'rxjs'], factory) :
    (global = global || self, factory(global['ui-phone-input'] = {}, global.ng.core, global.angular, global.ng.common, global.flag, global.libphonenumberJs, global.rxjs));
}(this, (function (exports, core, angular, common, flag, libphonenumberJs, rxjs) { 'use strict';

    flag = flag && Object.prototype.hasOwnProperty.call(flag, 'default') ? flag['default'] : flag;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // commented out ISO codes not recognized
    var ISO_COUNTRY_CODE_TO_NAME = {
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

    var CountrySelectComponent = /** @class */ (function () {
        function CountrySelectComponent(el) {
            this.el = el;
            this.ionChange = new core.EventEmitter();
            this.searchString = '';
        }
        CountrySelectComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.keySubscription = rxjs.fromEvent(document, 'keydown').subscribe(function (e) {
                if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    _this.selectAll = true;
                }
                if (e.key.length === 1) {
                    _this.searchString = "" + _this.searchString + e.key;
                }
                if (e.key === 'Backspace' && _this.searchString.length) {
                    _this.searchString = _this.selectAll
                        ? ''
                        : _this.searchString.slice(0, _this.searchString.length - 1);
                    _this.selectAll = false;
                }
                _this.filter();
            });
        };
        CountrySelectComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            var selectedItem = this.el.nativeElement.querySelector("#" + this.selected.code);
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.scrollIntoView();
                    selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.focus();
                    return [2 /*return*/];
                });
            }); }, 500);
        };
        CountrySelectComponent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.keySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        CountrySelectComponent.prototype.filter = function () {
            var _this = this;
            this.filteredCountries = !this.searchString
                ? undefined
                : this.countries.filter(function (country) { return country.name.toLowerCase().includes(_this.searchString.toLowerCase()); });
        };
        return CountrySelectComponent;
    }());
    CountrySelectComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'country-select',
                    template: "<ion-list>\n  <ion-item\n    *ngFor=\"let country of filteredCountries ? filteredCountries : countries\"\n    (click)=\"ionChange.emit(country); popover.dismiss()\"\n    [button]=\"true\"\n    lines=\"none\"\n    [id]=\"country.code\"\n  >\n    <ion-row class=\"ion-justify-content-between ion-align-items-center\">\n      <ion-row class=\"ion-align-items-center\">\n        <span class=\"flag ion-margin-end\">{{ country.emoji }}</span>\n        {{ country.name }}\n      </ion-row>\n      <span class=\"code\">+{{ country.numberCode }}</span>\n    </ion-row>\n  </ion-item>\n  <ion-row class=\"no-results\" *ngIf=\"filteredCountries?.length === 0\">\n    {{ noResultsText }}\n  </ion-row>\n</ion-list>\n",
                    styles: [":host{display:contents;position:relative}:host ion-item{font-size:14px}:host ion-item .flag{font-size:24px}:host ion-item>ion-row{flex:1;flex-wrap:nowrap}:host ion-item>ion-row>ion-row{flex-wrap:nowrap}:host ion-item .code{font-weight:500;opacity:.64}:host .no-results{align-items:center;cursor:not-allowed;justify-content:center;min-height:100px;opacity:.32}"]
                },] }
    ];
    CountrySelectComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    CountrySelectComponent.propDecorators = {
        countries: [{ type: core.Input }],
        selected: [{ type: core.Input }],
        noResultsText: [{ type: core.Input }],
        ionChange: [{ type: core.Output }]
    };

    var UiPhoneInputComponent = /** @class */ (function () {
        function UiPhoneInputComponent(popover) {
            this.popover = popover;
            this.defaultCountry = 'US';
            this.country = this.defaultCountry;
            this.noResultsText = 'No Results';
            this.ionChangePhoneNumber = new core.EventEmitter();
            this.ionChangeValidity = new core.EventEmitter();
            this._value = new rxjs.BehaviorSubject(undefined);
            this._valueToEmit = new rxjs.BehaviorSubject(undefined);
            this._country = new rxjs.BehaviorSubject(undefined);
            this.countryNamesByIsoCode = ISO_COUNTRY_CODE_TO_NAME;
            this.iterableCountryInfos = [];
        }
        UiPhoneInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.emojiRefByIsoCode = Object.keys(this.countryNamesByIsoCode).reduce(function (map, code) {
                map[code] = flag(code);
                _this.iterableCountryInfos.push({
                    emoji: map[code],
                    name: _this.countryNamesByIsoCode[code],
                    code: code,
                    numberCode: libphonenumberJs.getCountryCallingCode(code),
                });
                return map;
            }, {});
            this.countrySubscription = this._country
                .asObservable()
                .subscribe(function (_code) {
                var code = _code !== null && _code !== void 0 ? _code : _this.defaultCountry;
                _this.countryInfo = {
                    emoji: _this.emojiRefByIsoCode[code],
                    name: _this.countryNamesByIsoCode[code],
                    code: code,
                    numberCode: libphonenumberJs.getCountryCallingCode(code),
                };
            });
        };
        UiPhoneInputComponent.prototype.ngOnChanges = function (changes) {
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
        };
        UiPhoneInputComponent.prototype.ngOnDestroy = function () {
            this.countrySubscription.unsubscribe();
        };
        UiPhoneInputComponent.prototype.change = function (event) {
            if (event.detail.value) {
                this.parse(event.detail.value);
            }
            else {
                this.resetFields();
                this.ionChangeValidity.emit(false);
            }
            this.ionChangePhoneNumber.emit(this._valueToEmit.value);
        };
        UiPhoneInputComponent.prototype.openCountrySelect = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var popover;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.popover.create({
                                component: CountrySelectComponent,
                                componentProps: {
                                    noResultsText: this.noResultsText,
                                    countries: this.iterableCountryInfos,
                                    selected: this.countryInfo,
                                    ionChange: {
                                        emit: function (countryInfo) {
                                            console.log('emit');
                                            _this._country.next(countryInfo.code);
                                            if (_this._value.value) {
                                                _this.parse(_this._value.value.toString());
                                            }
                                            _this.ionChangePhoneNumber.emit(_this._valueToEmit.value);
                                        },
                                    },
                                },
                                cssClass: 'country-popover',
                                event: event,
                                showBackdrop: false,
                                animated: false,
                            })];
                        case 1:
                            popover = _a.sent();
                            return [2 /*return*/, popover.present()];
                    }
                });
            });
        };
        UiPhoneInputComponent.prototype.parse = function (value) {
            if (value === void 0) { value = this.value; }
            var parsedPhoneNumber = libphonenumberJs.parsePhoneNumberFromString(value, this._country.value);
            this._value.next(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.nationalNumber);
            this._valueToEmit.next(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.number);
            if (parsedPhoneNumber) {
                this._country.next(parsedPhoneNumber.country);
            }
            this.ionChangeValidity.emit(!!(parsedPhoneNumber === null || parsedPhoneNumber === void 0 ? void 0 : parsedPhoneNumber.isValid()));
        };
        UiPhoneInputComponent.prototype.resetFields = function () {
            this._value.next(undefined);
            this._valueToEmit.next(undefined);
        };
        return UiPhoneInputComponent;
    }());
    UiPhoneInputComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ui-phone-input',
                    template: "<ion-item>\n  <ion-button fill=\"clear\" (click)=\"openCountrySelect($event)\">\n    {{ countryInfo?.emoji }}\n    <ion-icon name=\"caret-down-sharp\" slot=\"end\" color=\"dark\"> </ion-icon>\n    <ion-text color=\"dark\" class=\"ion-margin-start\">\n      +{{ countryInfo?.numberCode }}\n    </ion-text>\n  </ion-button>\n  <!-- <ion-select\n      [value]=\"countryInfo?.code\"\n      (ionChange)=\"changeCountry($event)\"\n      interface=\"popover\"\n    >\n      <ion-searchbar></ion-searchbar>\n      <ion-select-option\n        [value]=\"_countryInfo.code\"\n        *ngFor=\"let _countryInfo of iterableCountryInfos\"\n      >\n        {{ _countryInfo.emoji }}\n        {{ _countryInfo.name }}\n        +{{ _countryInfo.numberCode }}\n      </ion-select-option>\n    </ion-select> -->\n  <ion-input\n    [value]=\"_value.value\"\n    (ionChange)=\"change($event)\"\n    [placeholder]=\"placeholder\"\n  >\n  </ion-input>\n</ion-item>\n",
                    styles: [":host{display:block}:host ion-item{--padding-start:0}:host ion-item>ion-button{--border-radius:0;font-size:24px;height:100%;margin:0}:host ion-item>ion-button ion-icon,:host ion-item>ion-button ion-text{font-size:14px}"]
                },] }
    ];
    UiPhoneInputComponent.ctorParameters = function () { return [
        { type: angular.PopoverController }
    ]; };
    UiPhoneInputComponent.propDecorators = {
        country: [{ type: core.Input }],
        value: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        noResultsText: [{ type: core.Input }],
        ionChangePhoneNumber: [{ type: core.Output }],
        ionChangeValidity: [{ type: core.Output }]
    };

    var components = [UiPhoneInputComponent, CountrySelectComponent];
    var UiPhoneInputModule = /** @class */ (function () {
        function UiPhoneInputModule() {
        }
        return UiPhoneInputModule;
    }());
    UiPhoneInputModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: __spread(components),
                    imports: [angular.IonicModule, common.CommonModule],
                    exports: __spread(components),
                    entryComponents: [],
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CountrySelectComponent = CountrySelectComponent;
    exports.ISO_COUNTRY_CODE_TO_NAME = ISO_COUNTRY_CODE_TO_NAME;
    exports.UiPhoneInputComponent = UiPhoneInputComponent;
    exports.UiPhoneInputModule = UiPhoneInputModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ui-phone-input.umd.js.map
