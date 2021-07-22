import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	public loggedIn: boolean = false;
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.comprobarSesion();
	}

	public cerrarSesion() {
		console.log(`Me invocaron`);
		localStorage.removeItem('login');
		this.loggedIn = false;
		this.router.navigateByUrl('/inicio');
	}

	private comprobarSesion() {
		let login = localStorage.getItem('login');
		if (login.length > 0) {
			this.loggedIn = true;
		}
	}
}
