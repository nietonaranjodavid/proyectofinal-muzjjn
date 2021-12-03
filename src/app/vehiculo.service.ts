import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from './vehiculo';

/*
Los componentes consumen servicios; es decir, puede inyectar un servicio en un componente, dándole acceso al componente a ese servicio.

Una aplicación real buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.

En este tutorial, HeroService.getHeroes() devolverá un Observable porque eventualmente usará el método angular HttpClient.get para buscar a los héroes y HttpClient.get() devuelve un Observable.

observable
Un productor de múltiples valores, que empuja a suscriptores. Se utiliza para el manejo de eventos asíncronos en todo Angular. Ejecutas un observable suscribiéndote con su método subscribe(), pasando devoluciones de llamada para notificaciones de nuevos valores, errores o finalización.
*/

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private url2 = 'https://restapiconcesionario.herokuapp.com/vehiculo';
  private url3 =
    'https://restapiconcesionario.herokuapp.com/vehiculo/actualiza';
  private url4 = 'https://restapiconcesionario.herokuapp.com/vehiculo/nuevoP';
  private url5 = 'https://restapiconcesionario.herokuapp.com/vehiculo/borrar';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getVehiculosApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url2);
  }

  /**update**/
  updateVehiculo(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url3}/${doc.modelo}`;
    return this.http.post(url2Id, doc);
  }

  /** DELETE*/
  deleteVehiculo(vehiculo: Vehiculo) {
    const url5 = `https://restapiconcesionario.herokuapp.com/vehiculo/borrar/${
      vehiculo._modelo
    }`;
    return this.http.get(url5);
  }
  /** POST **/
  nuevoVehiculoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  /*Vehiculo por su nombre */
  getVehiculo(modelo: string) {
    const url2 = `https://restapiconcesionario.herokuapp.com/vehiculo/${modelo}`;
    return this.http.get(url2);
  }
}
