/**
 * Interface para el tipo de la solicitud que se realiza al
 * servicio de guardar los datos del destinatario.
 */

export interface RequestData {
	user_id?: number;
	rut_destinatario: string;
	nombre_destinatario: string;
	apellido_destinatario: string;
	correo_destinatario: string;
	telefono_destinatario: string;
	banco_destinatario: string;
	cuenta_destinatario: number;
}
