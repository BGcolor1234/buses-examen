import { Chofer } from "../entidades/choferes";

export class Tlistachoferes {

    ListaChoferes: Chofer[];
    //listacarro: Producto[];

    constructor() {
        this.ListaChoferes = [];
        //this.listacarro = [];
    }
    Insertar(op: Chofer) {
        this.ListaChoferes.push(op);
    }
    Modificar(pos: number, op: Chofer) {
        this.ListaChoferes[pos] = op;
    }
    modificarChofer(codigo: string, choferActualizado: Chofer): void {
        const index = this.ListaChoferes.findIndex(c => c.codigo === codigo);
        if (index !== -1) {
            this.ListaChoferes[index] = choferActualizado;
        }
    }
    Eliminar(pos: number) {
        this.ListaChoferes.splice(pos, 1);
    }
    eliminarChofer(codigo: string): void {
        this.ListaChoferes = this.ListaChoferes.filter(c => c.codigo !== codigo);
    }
    listarChoferes(): Chofer[] {
        return this.ListaChoferes;
    }
    Listar() {
        this.ListaChoferes.forEach(a => {
            return a;
        })
    }
    /*
    InsertarCarro(op: Producto) {
        this.listacarro.push(op);
    }
    EliminarCarro(pos: number) {
        this.listacarro.splice(pos, 1);
    }*/


}