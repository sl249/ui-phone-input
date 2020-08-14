import { __awaiter } from "tslib";
import { Component, Input, ElementRef, Output, EventEmitter, } from '@angular/core';
import { fromEvent } from 'rxjs';
export class CountrySelectComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC91aS1waG9uZS1pbnB1dC91aS1waG9uZS1pbnB1dC9jb3VudHJ5LXNlbGVjdC9jb3VudHJ5LXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxHQUdiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBTy9DLE1BQU0sT0FBTyxzQkFBc0I7SUFnQmpDLFlBQW9CLEVBQThCO1FBQTlCLE9BQUUsR0FBRixFQUFFLENBQTRCO1FBUnhDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBSTlDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBSTJCLENBQUM7SUFFdEQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQzdELENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUVELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDcEQ7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTO29CQUNoQyxDQUFDLENBQUMsRUFBRTtvQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QjtZQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUV0RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU1QixVQUFVLENBQUMsR0FBUyxFQUFFO1lBQ3BCLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxjQUFjLEdBQUc7WUFDL0IsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssR0FBRztRQUN4QixDQUFDLENBQUEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCxXQUFXOztRQUNULE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsV0FBVyxHQUFHO0lBQ3RDLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDekMsQ0FBQyxDQUFDLFNBQVM7WUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQ3JFLENBQUM7SUFDUixDQUFDOzs7WUFsRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDZzQkFBOEM7O2FBRS9DOzs7WUFiQyxVQUFVOzs7d0JBa0JULEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ291bnRyeUluZm8gfSBmcm9tICcuLi91aS1waG9uZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY291bnRyeS1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY291bnRyeS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb3VudHJ5LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb3VudHJ5U2VsZWN0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gIEBJbnB1dCgpIGNvdW50cmllczogQ291bnRyeUluZm9bXTtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IENvdW50cnlJbmZvO1xuICBASW5wdXQoKSBub1Jlc3VsdHNUZXh0OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q291bnRyeUluZm8+KCk7XG5cbiAgcHVibGljIGZpbHRlcmVkQ291bnRyaWVzPzogQ291bnRyeUluZm9bXTtcblxuICBwcml2YXRlIHNlYXJjaFN0cmluZyA9ICcnO1xuICBwcml2YXRlIHNlbGVjdEFsbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBrZXlTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5rZXlTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykuc3Vic2NyaWJlKFxuICAgICAgKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnYScgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0QWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFN0cmluZyA9IGAke3RoaXMuc2VhcmNoU3RyaW5nfSR7ZS5rZXl9YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5rZXkgPT09ICdCYWNrc3BhY2UnICYmIHRoaXMuc2VhcmNoU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VhcmNoU3RyaW5nID0gdGhpcy5zZWxlY3RBbGxcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogdGhpcy5zZWFyY2hTdHJpbmcuc2xpY2UoMCwgdGhpcy5zZWFyY2hTdHJpbmcubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbHRlcigpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8XG4gICAgICBIVE1MSW9uSXRlbUVsZW1lbnRcbiAgICA+KGAjJHt0aGlzLnNlbGVjdGVkLmNvZGV9YCk7XG5cbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHNlbGVjdGVkSXRlbT8uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIHNlbGVjdGVkSXRlbT8uZm9jdXMoKTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5rZXlTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBmaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXJlZENvdW50cmllcyA9ICF0aGlzLnNlYXJjaFN0cmluZ1xuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogdGhpcy5jb3VudHJpZXMuZmlsdGVyKChjb3VudHJ5KSA9PlxuICAgICAgICAgIGNvdW50cnkubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRoaXMuc2VhcmNoU3RyaW5nLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICk7XG4gIH1cbn1cbiJdfQ==