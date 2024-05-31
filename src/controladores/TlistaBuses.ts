import { Bus } from "../entidades/buses";

export class TlistaBus {

    ListaBus: Bus[];
    constructor() {
        this.ListaBus = [];
        
    }
    Insertar(op: Bus) {
        this.ListaBus.push(op);
    }
    Modificar(pos: number, op: Bus) {
        this.ListaBus[pos] = op;
    }
    modificarChofer(codigo: string, choferActualizado: Bus): void {
        const index = this.ListaBus.findIndex(c => c.codigobuses === codigo);
        if (index !== -1) {
            this.ListaBus[index] = choferActualizado;
        }
    }
    Eliminar(pos: number) {
        this.ListaBus.splice(pos, 1);
    }
    eliminarChofer(codigo: string): void {
        this.ListaBus = this.ListaBus.filter(c => c.codigobuses !== codigo);
    }

    Listar() {
        this.ListaBus.forEach(a => {
            return a;
        })
    }
    listarBuses(): Bus[] {
        return this.ListaBus;
    }
}