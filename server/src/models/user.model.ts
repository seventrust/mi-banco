import * as UserSchema from '../schemes/users.scheme';
import { Destinatarios, Transferencia, User } from '../interface/user.interface';
import { connect, model } from 'mongoose';
import { DestinatarioNuevo, UsuarioNuevo } from '../interface/request.interface';

export class UserModel {
	constructor() {
		this.conexionMongo();
	}

	/**
	 * Metodo para conexion a la BD Mongo
	 */
	private async conexionMongo() {
		try {
			await connect('mongodb://localhost:27017/mi-banco', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (error) {
			console.error(error.message);
		}
	}
	/**
	 * Agreagar/ registrar usuario en la BD
	 */
	public async agregarNuevoUsuario(usuario: UsuarioNuevo) {
		try {
			//Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);
			//Crear el nuevo documento a insertar en la coleccion usuarios
			let doc = new UserModel({
				nombre: usuario.nombre,
				email: usuario.email,
				rut: usuario.rut,
				destinatarios: [],
				transferencia: [],
			});

			//Realizar transaccion
			await doc.save();

			return doc;
		} catch (error) {
			console.error(error.message);
		}
	}

	public async obtenerUsuario(rut: string): Promise<User | undefined> {
		try {
			//Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);

			let doc = await UserModel.findOne({ rut }).exec();

			if (null !== doc) {
				//*Se encontraron los destinatarios de la persona que quiere hacer la transferencia
				console.error('QUEVERGAS');
				let response: User = {
					nombre: doc.nombre,
					email: doc.email,
					rut: doc.rut,
					destinatarios: doc.destinatarios,
					transferencia: doc.transferencia,
				};
				return response;
			}
			return undefined;
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 * Metodo para agreagr un destinatario al documento User
	 * @param usuarioNuevo  @type UsuarioNuevo
	 *
	 */
	public async agregarNuevoDestinatario(rutCliente: string, destinatario: DestinatarioNuevo) {
		try {
			//Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);
			//* Se crea el objeto destinatarios para guardar en la coleccion que s
			//* coincida con el RUT que lo agreg[o]
			let destinatarios: Destinatarios = {
				nombre: destinatario.nombre,
				apellido: destinatario.apellido,
				email: destinatario.email,
				rut_destinatario: destinatario.rut_destinatario,
				telefono: destinatario.telefono,
				banco: destinatario.banco,
				tipo_cuenta: destinatario.tipo_cuenta,
				numero_cuenta: destinatario.numero_cuenta,
			};
			let doc = await UserModel.updateOne({ rut: rutCliente }, { $push: { destinatarios } });

			return doc;
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 * Metodo para agreagr una transferencia al usuario
	 * @param params
	 */
	public async agregarNuevaTransferencia(params: any) {
		try {
			//* Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);
			//* Se crea el objeto transferencia para guardar en la coleccion que s
			//* coincida con el RUT que la realiz[o]
			let transferencia: Transferencia = {
				nombre: params.nombre,
				banco: params.banco,
				email: params.email,
				rut: params.rut_transferencia,
				monto: params.monto,
				tipo_cuenta: params.tipo_cuenta,
			};

			let doc = await UserModel.updateOne({ rut: params.rut }, { $push: { transferencia } });
		} catch (error) {
			console.error(error.message);
		}
	}

	/**
	 * Metodo para buscar el listado de destinatarios del cliente
	 * @param params
	 * @return Promise any
	 */
	public async buscarDestinatarios(params: any): Promise<any> {
		try {
			//* Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);

			let doc = await UserModel.findOne({ rut: params.rut }).exec();

			if (null !== doc) {
				//*Se encontraron los destinatarios de la persona que quiere hacer la transferencia
				return doc.destinatarios;
			} else {
				//! No se encontraron los destinatarios !!!
				return null;
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	/**
	 * Metodo para buscar el listado de transferencias del cliente
	 * @param params
	 * @return Promise any
	 */
	public async buscarTransferencias(params: any): Promise<any> {
		try {
			//* Crear el modelo UserModel
			let UserModel = model<User>('User', UserSchema.default);

			let doc = await UserModel.findOne({ rut: params.rut }).exec();

			if (null !== doc) {
				//*Se encontraron el historial de transferencia
				return doc.transferencia;
			} else {
				//! No se encontraron los destinatarios !!!
				return null;
			}
		} catch (error) {
			console.error(error.message);
		}
	}
}
