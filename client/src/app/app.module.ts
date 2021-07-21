import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		InicioComponent,
		TransferenciasComponent,
		HistorialComponent,
		RegistrarComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
