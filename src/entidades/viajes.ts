import { Tripulacion } from "./tripulacion";
import { Bus } from "./buses";
export class Viaje{
    codigo: string;
    origen: string;
    destino: string;
    fechahorasalida:string;
    fechahorallegada:string;
    bus : Bus[];
    tripulacion : Tripulacion[];
    estado:'en curso' | 'completado' = 'en curso'
    constructor(codigo: string, origen: string, destino: string, fechahorasalida:string, fechahorallegada:string,estado:string){
    this.codigo = codigo;
    this.origen = origen;
    this.destino = destino;
    this.fechahorasalida = fechahorasalida;
    this.fechahorallegada = fechahorallegada;
    this.bus = [];
    this.tripulacion = [];
    this.estado = estado === 'en curso' || estado === 'completado'? estado : 'en curso';
    }
}