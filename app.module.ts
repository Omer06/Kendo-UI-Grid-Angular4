//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpModule } from '@angular/http';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ResultHandler } from './app.entity/resulthandler';
import { } from './'


//components
import { AppComponent } from './app.component';
import { GridViewComponent } from './app.kendo.grid/grid-view.component';

//directives
import { GetCityListInInitDirective } from './app.directives/GetCityListInInit'; 

//services
import { DataService } from './app.services/dataservice.service';


@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    GetCityListInInitDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
    HttpModule,
    FormsModule,
    DropDownsModule,
    RouterModule.forRoot([
      {
        path: "kendo-grid",
        component: GridViewComponent
      } 
    ])
  ],
  providers: [DataService,ResultHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
