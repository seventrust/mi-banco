import { DestinatarioNuevo } from '../interface/request.interface';
import { Destinatarios } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

export class CuentasController {
	public usermodel: UserModel = new UserModel();

	/**
	 * Metodo para conexion a Mongo y obtener los datos de
	 * de destinatarios del usuario
	 * @param number user_id
	 * @return Transferencia transferencias
	 */
	public async obtenerDestinatarios(rut: string): Promise<Destinatarios[] | undefined> {
		try {
			let destinatarios: Destinatarios[] = await this.usermodel.buscarDestinatarios(rut);
			if (null !== destinatarios) {
				return destinatarios;
			} else {
				return [];
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 *
	 */
	public async nuevoDestinatario(rutCliente: string, destinatario: DestinatarioNuevo) {
		try {
			if (!destinatario.email || !destinatario.rut_destinatario || !destinatario.nombre) {
				return null;
			}
			//por ahora no puedo revisar  el estado de la actualizacion
			let doc = await this.usermodel.agregarNuevoDestinatario(rutCliente, destinatario);
			return doc;
		} catch (error) {
			console.error(error.message);
		}
	}
}
