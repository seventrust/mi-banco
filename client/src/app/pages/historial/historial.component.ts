import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaHistorial } from 'src/app/interfaces/history.interface';
import { ComunicationService } from 'src/app/services/comunication-services.service';

@Component({
	selector: 'app-historial',
	templateUrl: './historial.component.html',
	styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
	//Creamos el objeto historial para su posterior maipulación
	public historial!: ListaHistorial;
	//Inyectamos las dependecias en el constructor
	constructor(private _cs: ComunicationService, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.cargarHistorial(params.user_id);
		});
	}

	private async cargarHistorial(userId: any) {
		this._cs.obtenerHistorial(userId).subscribe((response: HttpResponse<ListaHistorial>) => {
			if (response.ok) {
				this.historial = JSON.parse(response.body);
			}
		});
	}
}
