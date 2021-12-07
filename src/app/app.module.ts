import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BoxListComponent } from './box-list/box-list.component';
import { HeaderComponent } from './header/header.component'
import { CommonModule } from '@angular/common';
import { BoxDetailComponent } from './box-detail/box-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoxListComponent,
    BoxDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
