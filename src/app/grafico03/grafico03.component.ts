import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-grafico03',
  templateUrl: './grafico03.component.html',
  styleUrls: ['./grafico03.component.css'],
})
export class Grafico03Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  vehiculos: Array<Vehiculo> = [];
  vehiculosApi = null;
  vehiculoTmp: any;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Ganancias Concesionario',
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Euros',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    colors: ['#63FF33', '#000000'],
    xAxis: {
      accessibility: {},
      title: {
        text: 'concesionarios',
      },
    },
    series: [
      {
        name: 'Total',
        type: 'bar',
        data: [],
      },
    ],

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      backgroundColor: '#FF10',
    },
  };

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.vehiculoService.getVehiculosApi().subscribe(
      (result) => {
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
        const dataSeries = misDatos.map((x: Vehiculo) => x.resultado1());
        const dataCategorias = misDatos.map((x: Vehiculo) => x._concesionario);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico03', this.chartOptions);
      },
      (error) => console.log(error)
    );
  }
}
