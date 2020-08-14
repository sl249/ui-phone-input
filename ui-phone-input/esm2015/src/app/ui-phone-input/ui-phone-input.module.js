import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UiPhoneInputComponent } from './ui-phone-input/ui-phone-input.component';
import { CountrySelectComponent } from './ui-phone-input/country-select/country-select.component';
const components = [UiPhoneInputComponent, CountrySelectComponent];
export class UiPhoneInputModule {
}
UiPhoneInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...components],
                imports: [IonicModule, CommonModule],
                exports: [...components],
                entryComponents: [],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcGhvbmUtaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC91aS1waG9uZS1pbnB1dC91aS1waG9uZS1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE1BQU0sVUFBVSxHQUFHLENBQUMscUJBQXFCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQVFuRSxNQUFNLE9BQU8sa0JBQWtCOzs7WUFOOUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDeEIsZUFBZSxFQUFFLEVBQUU7YUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVWlQaG9uZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi91aS1waG9uZS1pbnB1dC91aS1waG9uZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291bnRyeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vdWktcGhvbmUtaW5wdXQvY291bnRyeS1zZWxlY3QvY291bnRyeS1zZWxlY3QuY29tcG9uZW50JztcbmNvbnN0IGNvbXBvbmVudHMgPSBbVWlQaG9uZUlucHV0Q29tcG9uZW50LCBDb3VudHJ5U2VsZWN0Q29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbLi4uY29tcG9uZW50c10sXG4gIGltcG9ydHM6IFtJb25pY01vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogWy4uLmNvbXBvbmVudHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBVaVBob25lSW5wdXRNb2R1bGUge31cbiJdfQ==