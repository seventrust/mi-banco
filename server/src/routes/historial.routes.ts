import express from 'express';
import { Transferencia } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

/**
 * Crear la clase Historial con el metodo index de acceso libre por
 * metodo HTTP
 */
export class Historial {
	private usermodel: UserModel = new UserModel();

	public async index(req: express.Request, res: express.Response) {
		//Extraccion del metdo HTTP desde la interfaz Request
		let { method } = req;

		switch (method.toUpperCase()) {
			case 'GET':
				let result: Transferencia[] = (await this.obtenerHistorial(req.body.rut)) || [];
				res.json({
					statusCode: 200,
					response: result,
				});

				break;

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
	 * @param string rut
	 * @return Transferencia transferencias
	 */
	private async obtenerHistorial(rut: string): Promise<Transferencia[] | undefined> {
		//TODO?
		//! Ahora viene lo bueno que es el acceso a los datos
		try {
			let transferencias: Transferencia[] = await this.usermodel.buscarTransferencias(rut);
			if (null !== transferencias) {
				return transferencias;
			}
			return undefined;
		} catch (error) {
			console.error(error.message);
		}
	}
}
