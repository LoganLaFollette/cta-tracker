import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainComponent } from './components/train/train.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatTableModule} from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArrivalsUiComponent } from './components/arrivals-ui/arrivals-ui.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    ArrivalsUiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
