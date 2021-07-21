export interface ListaHistorial {
	historial: Historial[];
}

export interface Historial {
	destinatario: string;
	rut: string;
	banco: string;
	tipo_cuenta: string;
	monto: number;
}
