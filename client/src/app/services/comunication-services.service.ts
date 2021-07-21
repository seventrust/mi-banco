import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaBancos } from '../interfaces/bank-list.interface';
import { clean } from 'rut.js';
import { Observable } from 'rxjs';
import { RequestData } from '../interfaces/request-data.interface';
import { environment } from 'src/environments/environment';
import { ListaHistorial } from '../interfaces/history.interface';

@Injectable({
	providedIn: 'root',
})
export class ComunicationService {
	//Constructor donde inyectan dependencias para conexion
	constructor(private _client: HttpClient) {}

	/**
	 * Método para obtener el listado de bancos desde la URL
	 * @returns observable
	 */
	public getBankList(): Observable<ListaBancos> {
		return this._client.get<ListaBancos>(environment.banksUrl);
	}

	/**
	 * Metodo para guardar un nuevo destinatario de fondos de pensions ;D
	 * @param FormGroup values
	 * @return Observable
	 */

	public guardarFormulario(data: any): Promise<HttpResponse<any>> {
		//TODO: Definir el objeto que debe ser enviado al servicio
		let requestData: RequestData = {
			rut_destinatario: clean(data.rut),
			nombre_destinatario: data.nombre.trim(),
			apellido_destinatario: data.apelido.trim(),
			correo_destinatario: data.correo.trim(),
			telefono_destinatario: data.telefono.trim(),
			banco_destinatario: data.banco.trim(),
			cuenta_destinatario: parseInt(data.cuenta.trim()),
		};

		return this._client.post<HttpResponse<any>>(`${environment.apiUrl}/v1/registro`, requestData, {}).toPromise();
	}

	/**
	 * Metodo para obtener la lista de destinatarios de un usuario en particular
	 */

	public obtenerDestinatarios(userId: any): Observable<any> {
		return this._client.get(`${environment.apiUrl}/v1/destinatarios`, {
			params: {
				user_id: userId,
			},
		});
	}

	public obtenerHistorial(userId: any): Observable<HttpResponse<ListaHistorial>> {
		return this._client.get<HttpResponse<ListaHistorial>>(`${environment.apiUrl}/v1/historial`, {
			params: {
				user_id: userId,
			},
		});
	}
}
