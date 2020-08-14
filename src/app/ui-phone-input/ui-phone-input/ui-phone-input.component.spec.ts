import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UiPhoneInputComponent } from './ui-phone-input.component';

describe('UiPhoneInputComponent', () => {
  let component: UiPhoneInputComponent;
  let fixture: ComponentFixture<UiPhoneInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiPhoneInputComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPhoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
