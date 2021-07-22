import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComunicationService } from '../../services/comunication-services.service';

@Component({
	selector: 'app-transferencias',
	templateUrl: './transferencias.component.html',
	styleUrls: ['./transferencias.component.css'],
})
export class TransferenciasComponent implements OnInit {
	resultados: any[] = [];
	busquedaResultados: any[] = [];
	rut!: any;

	constructor(private _cs: ComunicationService) {}

	ngOnInit(): void {}

	public async obtenerDestinatarios() {
		this.init();
		this._cs.buscarDestinatarios(this.rut).subscribe(
			(response: HttpResponse<any>) => {
				Object.assign(this.busquedaResultados, response.body);
			},
			(error: any) => {
				console.error(error.message);
				Swal.fire(`No tienes destinatarios`);
			}
		);
	}

	private init() {
		let login = JSON.parse(localStorage.getItem('login'));

		if (Object.keys(login).length > 0) {
			this.rut = login.usuario.rut;
		}
	}

	searchOnKeyUp(event: any) {
		let input = event.target.value;
		console.log('event.target.value: ' + input);
		console.log('this.searchResults: ' + this.busquedaResultados);
		if (input.length > 1) {
			this.resultados = this.searchFromArray(this.busquedaResultados, input);
		}
	}

	searchFromArray(arr: any[], regex: any) {
		let matches = [],
			i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].match(regex)) {
				matches.push(arr[i]);
			}
		}
		console.log('matches: ' + matches);
		return matches;
	}
}
