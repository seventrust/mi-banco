import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validate, clean, format } from 'rut.js';

//Una interfaz pequeña para mostrar errores en el formulario campoRUT
interface ErrorValidate {
	[s: string]: boolean;
}
@Injectable({
	providedIn: 'root',
})
export class RutService {
	constructor() {}
	public rutValido(control: FormControl): ErrorValidate {
		if (!control.value) {
			return { rutError: true };
		}

		let cleanValue: string = clean(control.value);

		let esValido: boolean = validate(cleanValue);

		let formateado: string = format(cleanValue);

		if (esValido) {
			control.setValue(formateado);

			return { rutError: false };
		} else {
			//control.setErrors(null);
			control.setValue(cleanValue);
			control.markAsTouched();
			return { rutError: true };
		}
	}
}
