import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Concesionario } from '../concesionario';
import { Vehiculo } from '../vehiculo';
import { ConcesionarioService } from '../concesionario.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-concesionario-detail',
  templateUrl: './concesionario-detail.component.html',
  styleUrls: ['./concesionario-detail.component.css']
})
export class ConcesionarioDetailComponent implements OnInit {
  concesionario: Concesionario;
  concesionarioApi = null;

  //concesionarioApi = null;
  constructor(
    private route: ActivatedRoute,
    private concesionarioService: ConcesionarioService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getConcesionario();
  }

  getConcesionario(): void {
    let nombre = this.route.snapshot.paramMap.get('_nombre');
    this.concesionarioService.getConcesionario(nombre).subscribe(s => {
      this.concesionarioApi = s;
      let vehiculos: Array<Vehiculo> = new Array();
      for (let vehiculo of this.concesionarioApi[0].Vehiculos) {
        let p = new Vehiculo(
          vehiculo._id,
          vehiculo._modelo,
          vehiculo._precio,
          vehiculo._cantidad,
          vehiculo._matriculacion,
          vehiculo._tipo,
          vehiculo._concesionario
        );
        vehiculos.push(p);
      }
      this.concesionario = new Concesionario(
        this.concesionarioApi[0]._id,
        this.concesionarioApi[0]._nombre,
        this.concesionarioApi[0]._municipio,
        this.concesionarioApi[0]._direccion,
        this.concesionarioApi[0]._numtelefono,
        vehiculos
      );
    });
  }
  /*getconcesionario(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.messageService.add(
      `concesionariosComponent: Selected vehiculo nombre=${id}`
    );
    this.concesionarioService.getconcesionario(id).subscribe(concesionario => {
      const concesionarioTmp: any = concesionario;
      this.concesionario = concesionarioTmp[0];
    });
  }*/
  add(
    id: string,
    modelo: string,
    precio: string,
    cantidad: string,
    matriculacion: string,
    tipo: string
  ): void {
    const idV = id;
    const modeloV = modelo.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const _matriculacionV = new Date(matriculacion);
    const tipoV = tipo;
    if (!modelo) {
      return;
    }
    const newDoc: any = {
      id: idV,
      modelo: modeloV,
      precio: precioV,
      cantidad: cantidadV,
      matriculacion: _matriculacionV,
      tipo: tipoV,
      concesionario: this.concesionario._nombre
    };
    this.concesionarioService.nuevoVehiculoPost(newDoc).subscribe(vehiculo => {
      const vehiculoTmp: any = newDoc;
      this.concesionario._vehiculos.push(vehiculoTmp);
    });
  }
  save(_municipio: string): void {
    const doc = {
      id: this.concesionario._id,
      nombre: this.concesionario._nombre,
      municipio: this.concesionario._municipio,
      direccion: this.concesionario._direccion,
      numtelefono: this.concesionario._numtelefono
    };
    this.concesionarioService
      .updateConcesionario(doc)
      .subscribe(() => this.goBack());
  }
  /*save(_municipio: string): void {
    const doc = {
      id: this.concesionario._id,
      nombre: this.concesionario._nombre,
      municipio: this.concesionario._municipio,
      direccion: this.concesionario._direccion,
      numtelefono: this.concesionario._numtelefono
    };
    this.concesionarioService.updateconcesionario(doc).subscribe(() => this.goBack());
  }*/
  goBack(): void {
    this.location.back();
  }
}
