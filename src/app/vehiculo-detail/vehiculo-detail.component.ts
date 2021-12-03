import { Component, OnInit, Input } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehiculo-detail',
  templateUrl: './vehiculo-detail.component.html',
  styleUrls: ['./vehiculo-detail.component.css']
})
export class VehiculoDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  vehiculo: Vehiculo;
  // vehiculosApi = null;

  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getVehiculo();
  }
  save(_precio: string): void {
    const doc = {
      id: this.vehiculo._id,
      modelo: this.vehiculo._modelo,
      matriculacion: new Date(this.vehiculo._matriculacion),
      precio: parseInt(_precio),
      tipo: this.vehiculo._tipo,
      cantidad: this.vehiculo._cantidad,
      concesionario: this.vehiculo._concesionario
    };
    this.vehiculoService.updateVehiculo(doc).subscribe(() => this.goBack());
  }
  /*
  Para recuperar el documento por el Id reicibido como parámetro
  */
  getVehiculo(): void {
    const modelo = this.route.snapshot.paramMap.get('modelo');
    this.messageService.add(`Vehiculo Selecionado --> ${modelo}`);
    this.vehiculoService.getVehiculo(modelo).subscribe(vehiculo => {
      const vehiculoTmp: any = vehiculo;
      this.vehiculo = vehiculoTmp[0];
    });
  }

  goBack(): void {
    this.location.back();
  }
}
