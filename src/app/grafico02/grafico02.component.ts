import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-grafico02',
  templateUrl: './grafico02.component.html',
  styleUrls: ['./grafico02.component.css']
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  vehiculos: Vehiculo[];
  vehiculosApi = null;
  vehiculoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Inspección Tecnica de Vehiculos (ITV)'
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'fecha'
      }
    },
    colors: ['#FF0400'],
    xAxis: {
      accessibility: {},
      title: {
        text: 'Vehiculos'
      }
    },
    series: [
      {
        type: 'area',
        data: [],
        name: 'Próxima ITV',
        lineColor: '#FF0400'
      }
    ],

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      backgroundColor: '#FF04'
    }
  };

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    //  this.getHeroesApi();
    this.getMisDatos();
  }

  Estructura: {
    id: '5';
    name: 'Bode.';
    salary: 84909;
  };

  getMisDatos() {
    this.vehiculoService.getVehiculosApi().subscribe(
      result => {
        const misDatos: Array<Vehiculo> = [];
        let api = null;
        api = result;
        for (let x of api) {
          let p = new Vehiculo(
            x._id,
            x._modelo,
            x._matriculacion,
            x._precio,
            x._cantidad,
            x._tipo,
            x._concesionario
          );
          misDatos.push(p);
        }
        const dataSeries = misDatos.map((x: Vehiculo) => x.periodo());
        const dataCategorias = misDatos.map((x: Vehiculo) => x._modelo);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico02', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
