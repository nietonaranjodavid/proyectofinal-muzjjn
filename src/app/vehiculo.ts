export class Vehiculo {
  _id: string;
  _modelo: string;
  _matriculacion: Date;
  _precio: number;
  _tipo: string;
  _cantidad: number;
  _concesionario: string;

  public constructor(
    id: string,
    modelo: string,
    matriculacion: Date,
    precio: number,
    cantidad: number,
    tipo: string,
    concesionario: string
  ) {
    this._id = id;
    this._modelo = modelo;
    this._matriculacion = matriculacion;
    this._precio = precio;
    this._cantidad = cantidad;
    this._tipo = tipo;
    this._concesionario = concesionario;
  }
  get id() {
    return this._id;
  }
  get modelo() {
    return this._modelo;
  }
  get matriculacion() {
    return this._matriculacion;
  }
  get precio() {
    return this._precio;
  }
  get cantidad() {
    return this._cantidad;
  }
  get tipo() {
    return this._tipo;
  }
  get concesionario() {
    return this._concesionario;
  }

  resultado1() {
    let resultado = 0;
    for (let p of this._concesionario) {
      resultado = (this._precio * 0.21 + this._precio) * this._cantidad;
    }
    return resultado;
  }

  periodo() {
    let date: Date = new Date();
    let miliseconds: number =
      new Date(date).getTime() - new Date(this._matriculacion).getTime();
    let dia = miliseconds / 86400000;
    let anos = dia / 365;

    if (anos < 1) {
      let condicion: number = 4;
      return condicion;
    } else {
      if (anos < 10) {
        let condicion1: number = 2;
        return condicion1;
      } else {
        if (anos > 10) {
          let condicion2: number = 1;
          return condicion2;
        }
      }
    }
  }

  contado() {
    if (this._tipo == '0') {
      let precioiva: number = this._precio * 0.21 + this._precio;
      return precioiva;
    } else {
      let precioiva1: number = this._precio * 0.21 + this._precio;
      let preciofinal: number = this._precio * 0.04 + precioiva1;
      return preciofinal;
    }
  }

  financiado() {
    if (this._tipo == '0') {
      let precioiva: number = this._precio * 0.21 + this._precio;
      precioiva = precioiva - precioiva * 0.1;
      return precioiva;
    } else {
      let precioiva1: number = this._precio * 0.21 + this._precio;
      let preciofinal: number = this._precio * 0.04 + precioiva1;
      preciofinal = preciofinal - preciofinal * 0.1;
      return preciofinal;
    }
  }
}
