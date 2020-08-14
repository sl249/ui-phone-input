import { __awaiter } from "tslib";
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import flag from 'country-code-emoji';
import { ISO_COUNTRY_CODE_TO_NAME } from '../../utils/country-codes';
import { parsePhoneNumberFromString, getCountryCallingCode, } from 'libphonenumber-js';
import { BehaviorSubject } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { CountrySelectComponent } from './country-select/country-select.component';
export class UiPhoneInputComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcGhvbmUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC91aS1waG9uZS1pbnB1dC91aS1waG9uZS1pbnB1dC91aS1waG9uZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEdBSWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUNMLDBCQUEwQixFQUUxQixxQkFBcUIsR0FHdEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQWNuRixNQUFNLE9BQU8scUJBQXFCO0lBK0JoQyxZQUFvQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQTlCN0IsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFOUIsWUFBTyxHQUEyQixJQUFJLENBQUMsY0FBYyxDQUFDO1FBR3RELGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBRTVCLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUU5QyxDQUFDO1FBQ00sc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUVuRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQ2pDLFNBQVMsQ0FDVixDQUFDO1FBRUssaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FDdkMsU0FBUyxDQUNWLENBQUM7UUFFSyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQXlCLFNBQVMsQ0FBQyxD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IE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZmxhZyBmcm9tICdjb3VudHJ5LWNvZGUtZW1vamknO1xuaW1wb3J0IHsgSVNPX0NPVU5UUllfQ09ERV9UT19OQU1FIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291bnRyeS1jb2Rlcyc7XG5pbXBvcnQge1xuICBwYXJzZVBob25lTnVtYmVyRnJvbVN0cmluZyxcbiAgUGhvbmVOdW1iZXIsXG4gIGdldENvdW50cnlDYWxsaW5nQ29kZSxcbiAgQ291bnRyeUNhbGxpbmdDb2RlLFxuICBDb3VudHJ5Q29kZSxcbn0gZnJvbSAnbGlicGhvbmVudW1iZXItanMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvcG92ZXJDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuaW1wb3J0IHsgQ291bnRyeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY291bnRyeS1zZWxlY3QvY291bnRyeS1zZWxlY3QuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBDb3VudHJ5SW5mbyB7XG4gIGVtb2ppOiBzdHJpbmc7XG4gIGNvZGU6IENvdW50cnlDb2RlO1xuICBuYW1lOiBzdHJpbmc7XG4gIG51bWJlckNvZGU6IENvdW50cnlDYWxsaW5nQ29kZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktcGhvbmUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdWktcGhvbmUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi91aS1waG9uZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBVaVBob25lSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0Q291bnRyeSA9ICdVUyc7XG5cbiAgQElucHV0KCkgY291bnRyeTogUGhvbmVOdW1iZXJbJ2NvdW50cnknXSA9IHRoaXMuZGVmYXVsdENvdW50cnk7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5vUmVzdWx0c1RleHQgPSAnTm8gUmVzdWx0cyc7XG5cbiAgQE91dHB1dCgpIGlvbkNoYW5nZVBob25lTnVtYmVyID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBVaVBob25lSW5wdXRDb21wb25lbnRbJ192YWx1ZVRvRW1pdCddWyd2YWx1ZSddXG4gID4oKTtcbiAgQE91dHB1dCgpIGlvbkNoYW5nZVZhbGlkaXR5ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHB1YmxpYyBfdmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBob25lTnVtYmVyWydudW1iZXInXSB8IHVuZGVmaW5lZD4oXG4gICAgdW5kZWZpbmVkXG4gICk7XG5cbiAgcHVibGljIF92YWx1ZVRvRW1pdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGhvbmVOdW1iZXJbJ251bWJlciddIHwgdW5kZWZpbmVkPihcbiAgICB1bmRlZmluZWRcbiAgKTtcblxuICBwdWJsaWMgX2NvdW50cnkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBob25lTnVtYmVyWydjb3VudHJ5J10+KHVuZGVmaW5lZCk7XG5cbiAgcHVibGljIGNvdW50cnlOYW1lc0J5SXNvQ29kZSA9IElTT19DT1VOVFJZX0NPREVfVE9fTkFNRTtcbiAgcHVibGljIGVtb2ppUmVmQnlJc29Db2RlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG4gIHB1YmxpYyBjb3VudHJ5SW5mbz86IENvdW50cnlJbmZvO1xuICBwdWJsaWMgaXRlcmFibGVDb3VudHJ5SW5mb3M6IENvdW50cnlJbmZvW10gPSBbXTtcblxuICBwcml2YXRlIGNvdW50cnlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcG92ZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW1vamlSZWZCeUlzb0NvZGUgPSBPYmplY3Qua2V5cyh0aGlzLmNvdW50cnlOYW1lc0J5SXNvQ29kZSkucmVkdWNlPFxuICAgICAgVWlQaG9uZUlucHV0Q29tcG9uZW50WydlbW9qaVJlZkJ5SXNvQ29kZSddXG4gICAgPigobWFwLCBjb2RlKSA9PiB7XG4gICAgICBtYXBbY29kZV0gPSBmbGFnKGNvZGUpO1xuICAgICAgdGhpcy5pdGVyYWJsZUNvdW50cnlJbmZvcy5wdXNoKHtcbiAgICAgICAgZW1vamk6IG1hcFtjb2RlXSxcbiAgICAgICAgbmFtZTogdGhpcy5jb3VudHJ5TmFtZXNCeUlzb0NvZGVbY29kZV0sXG4gICAgICAgIGNvZGU6IDxDb3VudHJ5Q29kZT5jb2RlLFxuICAgICAgICBudW1iZXJDb2RlOiBnZXRDb3VudHJ5Q2FsbGluZ0NvZGUoPENvdW50cnlDb2RlPmNvZGUpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH0sIHt9KTtcblxuICAgIHRoaXMuY291bnRyeVN1YnNjcmlwdGlvbiA9IHRoaXMuX2NvdW50cnlcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnN1YnNjcmliZSgoX2NvZGUpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IF9jb2RlID8/IHRoaXMuZGVmYXVsdENvdW50cnk7XG5cbiAgICAgICAgdGhpcy5jb3VudHJ5SW5mbyA9IHtcbiAgICAgICAgICBlbW9qaTogdGhpcy5lbW9qaVJlZkJ5SXNvQ29kZVtjb2RlXSxcbiAgICAgICAgICBuYW1lOiB0aGlzLmNvdW50cnlOYW1lc0J5SXNvQ29kZVtjb2RlXSxcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIG51bWJlckNvZGU6IGdldENvdW50cnlDYWxsaW5nQ29kZShjb2RlKSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuICAgIGlmIChjaGFuZ2VzLnZhbHVlIHx8IGNoYW5nZXMuY291bnRyeSkge1xuICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNldEZpZWxkcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgICgoY2hhbmdlcy52YWx1ZSAmJiAhY2hhbmdlcy52YWx1ZS5pc0ZpcnN0Q2hhbmdlKCkpIHx8XG4gICAgICAgIChjaGFuZ2VzLmNvdW50cnkgJiYgIWNoYW5nZXMuY291bnRyeS5pc0ZpcnN0Q2hhbmdlKCkpKSAmJlxuICAgICAgdGhpcy5fdmFsdWUudmFsdWUgIT09IHRoaXMudmFsdWVcbiAgICApIHtcbiAgICAgIHRoaXMuaW9uQ2hhbmdlUGhvbmVOdW1iZXIuZW1pdCh0aGlzLl92YWx1ZVRvRW1pdC52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jb3VudHJ5LnZhbHVlKSB7XG4gICAgICB0aGlzLl9jb3VudHJ5Lm5leHQodGhpcy5kZWZhdWx0Q291bnRyeSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuY291bnRyeSAmJiB0aGlzLmNvdW50cnkpIHtcbiAgICAgIHRoaXMuX2NvdW50cnkubmV4dCh0aGlzLmNvdW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY291bnRyeVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgY2hhbmdlKGV2ZW50OiBDdXN0b21FdmVudCkge1xuICAgIGlmIChldmVudC5kZXRhaWwudmFsdWUpIHtcbiAgICAgIHRoaXMucGFyc2UoZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldEZpZWxkcygpO1xuICAgICAgdGhpcy5pb25DaGFuZ2VWYWxpZGl0eS5lbWl0KGZhbHNlKTtcbiAgICB9XG4gICAgdGhpcy5pb25DaGFuZ2VQaG9uZU51bWJlci5lbWl0KHRoaXMuX3ZhbHVlVG9FbWl0LnZhbHVlKTtcbiAgfVxuXG4gIGFzeW5jIG9wZW5Db3VudHJ5U2VsZWN0KGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXIuY3JlYXRlKHtcbiAgICAgIGNvbXBvbmVudDogQ291bnRyeVNlbGVjdENvbXBvbmVudCxcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgIG5vUmVzdWx0c1RleHQ6IHRoaXMubm9SZXN1bHRzVGV4dCxcbiAgICAgICAgY291bnRyaWVzOiB0aGlzLml0ZXJhYmxlQ291bnRyeUluZm9zLFxuICAgICAgICBzZWxlY3RlZDogdGhpcy5jb3VudHJ5SW5mbyxcbiAgICAgICAgaW9uQ2hhbmdlOiB7XG4gICAgICAgICAgZW1pdDogKGNvdW50cnlJbmZvOiBDb3VudHJ5SW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VtaXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50cnkubmV4dChjb3VudHJ5SW5mby5jb2RlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlKHRoaXMuX3ZhbHVlLnZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pb25DaGFuZ2VQaG9uZU51bWJlci5lbWl0KHRoaXMuX3ZhbHVlVG9FbWl0LnZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNzc0NsYXNzOiAnY291bnRyeS1wb3BvdmVyJyxcbiAgICAgIGV2ZW50LFxuICAgICAgc2hvd0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIGFuaW1hdGVkOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3BvdmVyLnByZXNlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2UodmFsdWUgPSB0aGlzLnZhbHVlKSB7XG4gICAgY29uc3QgcGFyc2VkUGhvbmVOdW1iZXIgPSBwYXJzZVBob25lTnVtYmVyRnJvbVN0cmluZyhcbiAgICAgIHZhbHVlLFxuICAgICAgdGhpcy5fY291bnRyeS52YWx1ZVxuICAgICk7XG5cbiAgICB0aGlzLl92YWx1ZS5uZXh0KHBhcnNlZFBob25lTnVtYmVyPy5uYXRpb25hbE51bWJlcik7XG4gICAgdGhpcy5fdmFsdWVUb0VtaXQubmV4dChwYXJzZWRQaG9uZU51bWJlcj8ubnVtYmVyKTtcblxuICAgIGlmIChwYXJzZWRQaG9uZU51bWJlcikge1xuICAgICAgdGhpcy5fY291bnRyeS5uZXh0KHBhcnNlZFBob25lTnVtYmVyLmNvdW50cnkpO1xuICAgIH1cblxuICAgIHRoaXMuaW9uQ2hhbmdlVmFsaWRpdHkuZW1pdCghIXBhcnNlZFBob25lTnVtYmVyPy5pc1ZhbGlkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZpZWxkcygpIHtcbiAgICB0aGlzLl92YWx1ZS5uZXh0KHVuZGVmaW5lZCk7XG4gICAgdGhpcy5fdmFsdWVUb0VtaXQubmV4dCh1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=