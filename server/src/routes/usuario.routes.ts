import express from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

/**
 * Crear la clase Usuario con el metodo index de acceso libre por
 * metodo HTTP para crear y obtener la sesion del usuario
 */
export class Usuario {
	private usuarioController!: UsuarioController;

	public async index(req: express.Request, res: express.Response) {
		this.usuarioController = new UsuarioController();
		try {
			//Extraccion del metdo HTTP desde la interfaz Request
			let { method } = req;

			switch (method.toUpperCase()) {
				case 'GET':
					let { rut } = req.query;
					if (rut != null) {
						let resultGet = await this.usuarioController.obtenerUsuario(rut.toString());
						if (resultGet == null) {
							res.json({
								statusCode: 404,
								response: `El usuario no se encuentra en la base de datos`,
							});
						}
						res.json({
							statusCode: 200,
							response: resultGet,
						});
					}

					break;
				case 'POST':
					let resultPost = await this.usuarioController.nuevoUsuario(req.body);
					if (resultPost == null) {
						res.json({
							statusCode: 401,
							response: `ocurrio un error en la creacion de usuario, por favor intente nuevamente`,
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
		} catch (error) {
			res.send({
				statusCode: 500,
				message: error.message,
			});
			console.error(error.message);
		}
	}
}
