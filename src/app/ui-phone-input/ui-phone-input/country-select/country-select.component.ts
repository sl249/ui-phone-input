import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CountryInfo } from '../ui-phone-input.component';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public popover: HTMLIonPopoverElement;

  @Input() countries: CountryInfo[];
  @Input() selected: CountryInfo;
  @Input() noResultsText: string;

  @Output() ionChange = new EventEmitter<CountryInfo>();

  public filteredCountries?: CountryInfo[];

  private searchString = '';
  private selectAll: boolean;
  private keySubscription?: Subscription;

  constructor(private el: ElementRef<HTMLDivElement>) {}

  ngOnInit() {
    this.keySubscription = fromEvent(document, 'keydown').subscribe(
      (e: KeyboardEvent) => {
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
      }
    );
  }

  ngAfterViewInit() {
    const selectedItem = this.el.nativeElement.querySelector<
      HTMLIonItemElement
    >(`#${this.selected.code}`);

    setTimeout(async () => {
      selectedItem?.scrollIntoView();
      selectedItem?.focus();
    }, 500);
  }

  ngOnDestroy() {
    this.keySubscription?.unsubscribe();
  }

  filter() {
    this.filteredCountries = !this.searchString
      ? undefined
      : this.countries.filter((country) =>
          country.name.toLowerCase().includes(this.searchString.toLowerCase())
        );
  }
}
