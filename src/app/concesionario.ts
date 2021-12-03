import { Vehiculo } from './vehiculo';
export class Concesionario {
  _id: string;
  _nombre: string;
  _municipio: string;
  _direccion: string;
  _numtelefono: number;
  _vehiculos: Array<Vehiculo>;

  constructor(
    id: string,
    nombre: string,
    municipio: string,
    direccion: string,
    numtelefono: number,
    vehiculos: Array<Vehiculo>
  ) {
    this._id = id;
    this._nombre = nombre;
    this._municipio = municipio;
    this._direccion = direccion;
    this._numtelefono = numtelefono;
    this._vehiculos = vehiculos;
  }

  resultado2() {
    let resultado = 0;
    for (let p of this._vehiculos) {
      resultado = p.precio * p.cantidad;
    }
    return resultado;
  }
}
