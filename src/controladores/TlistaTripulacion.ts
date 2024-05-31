import { Tripulacion } from "../entidades/tripulacion";

export class Tlistatripulacion {

    ListaTripulacion: Tripulacion[];

    constructor() {
        this.ListaTripulacion = [];
    }

    Insertar(op: Tripulacion) {
        this.ListaTripulacion.push(op);
    }

    listarTripulaciones(): Tripulacion[] {
        return this.ListaTripulacion;
    }

    Modificar(pos: number, op: Tripulacion) {
        this.ListaTripulacion[pos] = op;
    }

    modificarChofer(codigo: string, choferActualizado: Tripulacion): void {
        const index = this.ListaTripulacion.findIndex(c => c.idcodigo === codigo);
        if (index !== -1) {
            this.ListaTripulacion[index] = choferActualizado;
        }
    }

    Eliminar(pos: number) {
        this.ListaTripulacion.splice(pos, 1);
    }

    eliminarTripulacion(codigo: string): void {
        this.ListaTripulacion = this.ListaTripulacion.filter(tripulacion => tripulacion.idcodigo !== codigo);
    }

    Listar() {
        this.ListaTripulacion.forEach(a => {
            return a;
        })
    }



    modificarTripulacion(codigo: string, tripulacionActualizada: Tripulacion): void {
        const index = this.ListaTripulacion.findIndex(tripulacion => tripulacion.idcodigo === codigo);
        if (index !== -1) {
            this.ListaTripulacion[index] = tripulacionActualizada;
        }
        }









}
