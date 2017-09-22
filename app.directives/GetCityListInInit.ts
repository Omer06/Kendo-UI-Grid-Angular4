import { Directive , ElementRef, Input} from '@angular/core';
import { GridViewComponent } from './../app.kendo.grid/grid-view.component'

@Directive({
  selector: '[appGetCityListInInit]'
})
export class GetCityListInInitDirective {

  constructor(private gridViewComponent:GridViewComponent, private element: ElementRef) {
    
  }

 @Input() set appGetCityListInInit(countryId:string){
    
 }
}
