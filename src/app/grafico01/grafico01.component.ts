import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-grafico01',
  templateUrl: './grafico01.component.html',
  styleUrls: ['./grafico01.component.css']
})
export class Grafico01Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  vehiculos: Vehiculo[];
  vehiculosApi = null;
  vehiculoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Gráfico de barras',
      style: {
        color: '#'
      }
    },
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'vehiculos'
      }
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Precios en € (IVA incluido)'
      }
    },

    series: [
      {
        type: 'column',
        data: [],
        name: 'Precio en € (Al Contado)'
      },
      {
        type: 'column',
        data: [],
        name: 'Precio en € (Financiado)'
      }
    ],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
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

  /* getMisDatos() {
    this.vehiculoService.getvehiculosApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: vehiculo) => x._precio);
        const dataCategorias = misDatos.map((x: any) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }*/

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
            x._caducidad,
            x._precio,
            x._cantidad,
            x._tipo,
            x._concesionario
          );
          misDatos.push(p);
        }
        const dataSeries = misDatos.map((x: Vehiculo) => x.contado());
        const dataSeries1 = misDatos.map((x: Vehiculo) => x.financiado());
        const dataCategorias = misDatos.map((x: Vehiculo) => x._modelo);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.series[1]['data'] = dataSeries1;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico01', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
