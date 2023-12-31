import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';
import { OrgComponent } from './org/org.component';
import { LearnComponent } from './learn/learn.component';
import { TreeComponent } from './tree/tree.component';
import { Learn2Component } from './learn2/learn2.component';
import { ViewComponent } from './view/view.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    OrgComponent,
    LearnComponent,
    TreeComponent,
    Learn2Component,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
