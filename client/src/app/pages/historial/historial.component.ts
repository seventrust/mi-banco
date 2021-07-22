import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaHistorial } from 'src/app/interfaces/history.interface';
import { ComunicationService } from 'src/app/services/comunication-services.service';

@Component({
	selector: 'app-historial',
	templateUrl: './historial.component.html',
	styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
	//Creamos el objeto historial para su posterior maipulación
	public historial!: ListaHistorial[];
	public rut!: any;
	//Inyectamos las dependecias en el constructor
	constructor(private _cs: ComunicationService, private activatedRoute: ActivatedRoute, private router: Router) {
		this.rut = this.router.getCurrentNavigation().extras.state;
	}

	ngOnInit(): void {
		if (this.rut != null) {
			this.cargarHistorial(this.rut);
		} else {
			let dataSesion: any = JSON.parse(localStorage.getItem('login') || '{}');
			if (Object.keys(dataSesion).length > 0) {
				this.rut = dataSesion.rut;
			}
		}
	}

	private async cargarHistorial(rut: any) {
		this._cs.obtenerHistorial(rut).subscribe((response: HttpResponse<ListaHistorial[]>) => {
			if (response) {
				this.historial = response.body;
			}
		});
	}
}
