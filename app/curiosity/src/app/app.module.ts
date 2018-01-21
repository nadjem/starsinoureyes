import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CuriosityPhotoComponent } from './curiosity-photo/curiosity-photo.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HttpModule} from "@angular/http";
import {NgxPaginationModule} from 'ngx-pagination';
import { TabComponent } from './tab/tab.component';
import { ApodComponent } from './apod/apod.component';
import { MartianComponent } from './martian/martian.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './search/search.component';
import { LoadingModule } from 'ngx-loading';
import { ShowPhotoComponent } from './show-photo/show-photo.component';
import {enableProdMode} from '@angular/core';

enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    CuriosityPhotoComponent,
    NavBarComponent,
    TabComponent,
    ApodComponent,
    MartianComponent,
    SearchComponent,
    ShowPhotoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
