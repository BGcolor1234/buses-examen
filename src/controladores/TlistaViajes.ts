import { Viaje } from "../entidades/viajes";

export class Tlistaviajes {

    Listaviaje: Viaje[];
    //listacarro: Producto[];

    constructor() {
        this.Listaviaje = [];
        //this.listacarro = [];
    }
    Insertar(op: Viaje) {
        this.Listaviaje.push(op);
    }

    
    ModificarViaje(codigo: string, viajeActualizado: Viaje): void {
        const index = this.Listaviaje.findIndex(v => v.codigo === codigo);
        if (index !== -1) {
            this.Listaviaje[index] = viajeActualizado;
        }
    }
    
    modificarChofer(codigo: string, choferActualizado: Viaje): void {
        const index = this.Listaviaje.findIndex(c => c.codigo === codigo);
        if (index !== -1) {
            this.Listaviaje[index] = choferActualizado;
        }
    }
    Eliminar(pos: number) {
        this.Listaviaje.splice(pos, 1);
    }
    eliminarChofer(codigo: string): void {
        this.Listaviaje = this.Listaviaje.filter(c => c.codigo !== codigo);
    }

    Listar() {
        this.Listaviaje.forEach(a => {
            return a;
        })
    }
    listarViajes(): Viaje[] {
        return this.Listaviaje;
    }
    cambiarEstadoViaje(codigoViaje: string): void {
        const viaje = this.Listaviaje.find(v => v.codigo === codigoViaje);
        if (viaje && viaje.estado === 'en curso') {
            viaje.estado = 'completado';
        }
    }

    cantidadViajesPorBus(codigoBus: string): number {
        return this.Listaviaje.filter(v => v.bus.some(b => b.codigobuses === codigoBus) && v.estado === 'completado').length;
    }

    promedioViajesPorBus(): number {
        const busesCompletados = this.Listaviaje.filter(v => v.estado === 'completado').flatMap(v => v.bus.map(b => b.codigobuses));
        const uniqueBuses = Array.from(new Set(busesCompletados));
        const totalViajes = busesCompletados.length;
        return uniqueBuses.length > 0 ? totalViajes / uniqueBuses.length : 0;
    }


    EliminarPorCodigo(codigo: string): void {
        this.Listaviaje = this.Listaviaje.filter(viaje => viaje.codigo !== codigo);
    }
}

