import { AfterViewInit, ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CountryInfo } from '../ui-phone-input.component';
export declare class CountrySelectComponent implements OnInit, AfterViewInit, OnDestroy {
    private el;
    popover: HTMLIonPopoverElement;
    countries: CountryInfo[];
    selected: CountryInfo;
    noResultsText: string;
    ionChange: EventEmitter<CountryInfo>;
    filteredCountries?: CountryInfo[];
    private searchString;
    private selectAll;
    private keySubscription?;
    constructor(el: ElementRef<HTMLDivElement>);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    filter(): void;
}
