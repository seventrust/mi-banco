import express from 'express';
import { Destinatarios } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

/**
 * Crear la clase Transferencia con el metodo index de acceso libre por
 * metodo HTTP
 */
export class Transferencia {
	private usermodel: UserModel = new UserModel();

	public async index(req: express.Request, res: express.Response) {
		//Extraccion del metdo HTTP desde la interfaz Request
		let { method } = req;

		switch (method.toUpperCase()) {
			case 'GET':
				let resultGet: Transferencia[] = (await this.obtenerTransferencias(req.body.rut)) || [];
				res.json({
					statusCode: 200,
					response: resultGet,
				});

				break;
			case 'POST':
				let resultPost = this.nuevaTransferencia(req.body);

				res.json({
					statusCode: 200,
					response: {
						usuarioAgregado: true,
						registroActualizado: true,
					},
				});
			default:
				res.send({
					statusCode: 404,
					message: 'No existe el metodo',
				});
				break;
		}
	}

	/**
	 * Metodo para conexion a Mongo y obtener los datos del historial
	 * de transferencias del usuario
	 * @param number user_id
	 * @return Transferencia transferencias
	 */
	private async obtenerTransferencias(rut: string): Promise<Transferencia[] | undefined> {
		//TODO?
		//! Ahora viene lo bueno que es el acceso a los datos
		try {
			let transferencias: Transferencia[] = await this.usermodel.buscarTransferencias(rut);
			if (null !== transferencias) {
				return transferencias;
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 * Metodo para crear una transferencia hacia un destinatario
	 */
	private async nuevaTransferencia(params: any) {
		try {
			//por ahora no puedo revisar  el estado de la actualizacion
			await this.usermodel.agregarNuevaTransferencia(params);
		} catch (error) {
			console.error(error.message);
		}
	}
}
