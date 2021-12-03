import { Component, OnInit } from '@angular/core';
import { Concesionario } from '../concesionario';
import { ConcesionarioService } from '../concesionario.service';
import { MessageService } from '../message.service';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-concesionarios',
  templateUrl: './concesionarios.component.html',
  styleUrls: ['./concesionarios.component.css']
})
export class ConcesionariosComponent implements OnInit {
  concesionarios: Array<Concesionario> = [];
  concesionariosApi = null;
  concesionarioTmp: any;
  constructor(
    private concesionarioService: ConcesionarioService,
    private messageService: MessageService
  ) {}

  getConcesionariosApi() {
    this.concesionarioService
      .getConcesionariosApi()
      .subscribe(concesionarios => {
        this.concesionariosApi = concesionarios;
        for (let concesionario of this.concesionariosApi) {
          let vehiculos: Array<Vehiculo> = new Array();
          for (let vehiculo of concesionario.Vehiculos_) {
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
          let s = new Concesionario(
            concesionario._id,
            concesionario._nombre,
            concesionario._municipio,
            concesionario._direccion,
            concesionario._numtelefono,
            vehiculos
          );
          this.concesionarios.push(s);
        }
      });
  }
  add(
    id: string,
    nombre: string,
    municipio: string,
    direccion: string,
    numtelefono: string
    // productos: Producto
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const municipioV = municipio;
    const direccionV = direccion;
    const numtelefonoV = parseInt(numtelefono);
    //const _productosV = new Date(caducidad);

    if (!nombre) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      municipio: municipioV,
      direccion: direccionV,
      numtelefono: numtelefonoV
    };
    this.concesionarioService
      .nuevoConcesionarioPost(newDoc)
      .subscribe(concesionario => {
        this.concesionarioTmp = concesionario;
        this.concesionarios.push(this.concesionarioTmp);
      });
  }
  delete(concesionario: Concesionario): void {
    this.concesionarios = this.concesionarios.filter(h => h !== concesionario);
    this.messageService.add(`Concesionario Eliminado`);
    this.concesionarioService.deleteConcesionario(concesionario).subscribe();
    console.log(concesionario);
  }
  ngOnInit() {
    this.getConcesionariosApi();
  }
}
