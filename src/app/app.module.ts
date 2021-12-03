import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoDetailComponent } from './vehiculo-detail/vehiculo-detail.component';
import { VehiculoService } from './vehiculo.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { Grafico01Component } from './grafico01/grafico01.component';
import { Grafico02Component } from './grafico02/grafico02.component';
import { Grafico03Component } from './grafico03/grafico03.component';
import { ConcesionariosComponent } from './concesionarios/concesionarios.component';
import { ConcesionarioService } from './concesionario.service';
import { ConcesionarioDetailComponent } from './concesionario-detail/concesionario-detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
  ],
  declarations: [
    AppComponent,
    VehiculosComponent,
    VehiculoDetailComponent,
    MessagesComponent,
    Grafico01Component,
    Grafico02Component,
    Grafico03Component,
    ConcesionariosComponent,
    ConcesionarioDetailComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    VehiculoService,
    MessageService,
    ConcesionarioService,
    HomeComponent,
  ],
})
export class AppModule {}
