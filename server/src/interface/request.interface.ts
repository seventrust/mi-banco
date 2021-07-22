export interface UsuarioNuevo {
	nombre: string;
	email: string;
	rut: string;
}

export interface TransferenciaNueva {
	nombre: string;
	email: string;
	rut: string;
	banco: string;
	tipo_cuenta: number;
	monto: number;
}

export interface DestinatarioNuevo {
	nombre: string;
	apellido: string;
	email: string;
	rut_destinatario: string;
	telefono: string;
	banco: string;
	tipo_cuenta: number;
	numero_cuenta: number;
}
