import { Schema } from 'mongoose';
import { User } from '../interface/user.interface';

/**
 * Se crea el esquema User para mongo se debe verificar
 * que funcione
 */
const UserSchema = new Schema<User>({
	nombre: { type: String, required: true },
	email: { type: String, required: true },
	rut: { type: String, required: true },
	transferencia: [
		{
			nombre: String,
			email: String,
			rut: String,
			banco: String,
			tipo_cuenta: Number,
			monto: Number,
			fecha: { type: Date, default: Date.now },
		},
	],
	destinatarios: [
		{
			nombre: String,
			apellido: String,
			email: String,
			rut: String,
			telefono: String,
			banco: String,
			tipo_cuenta: Number,
			numero_cuenta: Number,
		},
	],
});

export default UserSchema;
