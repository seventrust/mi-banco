import express from 'express';
import { CuentasController } from '../controllers/cuentas.controller';
import { Destinatarios } from '../interface/user.interface';
/**
 * Crear la clase Historial con el metodo index de acceso libre por
 * metodo HTTP
 */
export class Cuentas {
	private cuentasController!: CuentasController;

	public async index(req: express.Request, res: express.Response) {
		this.cuentasController = new CuentasController();
		//Extraccion del metdo HTTP desde la interfaz Request
		let { method } = req;

		switch (method.toUpperCase()) {
			case 'GET':
				let { rut } = req.query;
				let resultGet: Destinatarios[] =
					(await this.cuentasController.obtenerDestinatarios(req.body.rut)) || [];

				res.json({
					statusCode: 200,
					response: resultGet,
				});

				break;
			case 'POST':
				let { rut_cliente } = req.body;
				let resultPost = await this.cuentasController.nuevoDestinatario(rut_cliente, req.body);

				if (resultPost == null) {
					res.json({
						statusCode: 401,
						response: `ocurrio un error en la creacion de destinatario, por favor intente nuevamente`,
					});
				}
				res.json({
					statusCode: 200,
					response: {
						usuarioAgregado: true,
						registroActualizado: true,
						usuario: resultPost,
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
}
