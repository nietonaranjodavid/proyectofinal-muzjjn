import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ConcesionariosComponent } from './concesionarios/concesionarios.component';
import { VehiculoDetailComponent } from './vehiculo-detail/vehiculo-detail.component';
import { Grafico01Component } from './grafico01/grafico01.component';
import { Grafico02Component } from './grafico02/grafico02.component';
import { Grafico03Component } from './grafico03/grafico03.component';
import { ConcesionarioDetailComponent } from './concesionario-detail/concesionario-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'concesionarios', component: ConcesionariosComponent },
  { path: 'grafico', component: Grafico01Component },
  { path: 'detail/:modelo', component: VehiculoDetailComponent },
  { path: 'detail2/:_nombre', component: ConcesionarioDetailComponent },
  { path: 'graficolineas', component: Grafico02Component },
  { path: 'graficoporcentaje', component: Grafico03Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
