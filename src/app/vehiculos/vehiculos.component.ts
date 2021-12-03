import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
//import { MessageService } from '../message.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[];
  vehiculosApi = null;
  vehiculoTmp: any;

  constructor(
    private vehiculoService: VehiculoService //private messageService: MessageService
  ) {}

  getVehiculosApi() {
    //this.messageService.add('Vehiculos');
    this.vehiculoService.getVehiculosApi().subscribe((vehiculos) => {
      this.vehiculosApi = vehiculos;
      this.vehiculos = this.vehiculosApi;
      this.vehiculoTmp = this.vehiculos.map((x: Vehiculo) => {
        return new Vehiculo(
          x._id,
          x._modelo,
          x._matriculacion,
          x._cantidad,
          x._precio,
          x._tipo,
          x._concesionario
        );
      });
    });
  }

  delete(vehiculo: Vehiculo): void {
    this.vehiculos = this.vehiculos.filter((h) => h !== vehiculo);
    //this.messageService.add(`Vehiculo Vendido`);
    this.vehiculoService.deleteVehiculo(vehiculo).subscribe();
    console.log(vehiculo);
  }

  add(
    id: string,
    modelo: string,
    precio: string,
    cantidad: string,
    matriculacion: string,
    tipo: string,
    concesionario: string
  ): void {
    const idV = id;
    const modeloV = modelo.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const matriculacionV = new Date(matriculacion);
    const tipoV = tipo;
    const concesionarioV = concesionario;
    if (!modelo) {
      return;
    }
    const newDoc: any = {
      id: idV,
      modelo: modeloV,
      precio: precioV,
      cantidad: cantidadV,
      matriculacion: matriculacionV,
      tipo: tipoV,
      concesionario: concesionarioV,
    };
    this.vehiculoService.nuevoVehiculoPost(newDoc).subscribe((vehiculo) => {
      this.vehiculoTmp = vehiculo;
      this.vehiculos.push(this.vehiculoTmp);
    });
  }

  ngOnInit() {
    this.getVehiculosApi();
  }
}
