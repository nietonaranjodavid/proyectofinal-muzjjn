import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Concesionario } from './concesionario';

@Injectable({ providedIn: 'root' })
export class ConcesionarioService {
  private url = 'https://restapiconcesionario.herokuapp.com/concesionario';
  private url1 =
    'https://restapiconcesionario.herokuapp.com/concesionario/concesionarios';
  private url2 =
    'https://restapiconcesionario.herokuapp.com/concesionario/nuevoS';
  private url4 = 'https://restapiconcesionario.herokuapp.com/vehiculo/nuevoP';
  private url5 =
    'https://restapiconcesionario.herokuapp.com/concesionario/concesionarios/actualiza';
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getConcesionariosApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url1);
  }

  /** PUT: update the hero by ID on the server */
  updateConcesionario(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url5}/${doc.nombre}`;
    return this.http.post(url2Id, doc);
  }

  //return this.http.put(url2Id, doc);

  /** DELETE*/
  deleteConcesionario(concesionario: Concesionario) {
    const url6 = `https://restapiconcesionario.herokuapp.com/concesionario/concesionarios/borrar/${
      concesionario._nombre
    }`;
    return this.http.get(url6);
  }
  /** POST*/
  nuevoConcesionarioPost(doc: any) {
    return this.http.post(this.url2, doc);
  }
  nuevoVehiculoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }
  getConcesionario(_nombre: string) {
    const url1id = `https://restapiconcesionario.herokuapp.com/concesionario/concesionarios/${_nombre}`;
    return this.http.get(url1id);
  }
}
