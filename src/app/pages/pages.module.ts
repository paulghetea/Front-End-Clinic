import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { OrganizarMaterialModule } from '../organizar-material/organizar-material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AnaliticaDialogoComponent } from './analitica/analitica-dialogo/analitica-dialogo.component';
import { AnaliticaComponent } from './analitica/analitica.component';
import { EspecialidadEdicionComponent } from './especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MedicoDialogoComponent } from './medico/medico-dialogo/medico-dialogo.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { CommonModule } from '@angular/common';
import { Not403Component } from './not403/not403.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConsultaComponent } from './consulta/consulta.component';
import { Not404Component } from './not404/not404.component';
import { RegistroComponent } from './registro/registro.component';
import { ReportepdfComponent } from './reporte/reportepdf/reportepdf.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizarMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    PdfViewerModule
  ],
  exports: [],
  declarations: [
    AnaliticaComponent,
    AnaliticaDialogoComponent,
    EspecialidadComponent,
    EspecialidadEdicionComponent,
    InicioComponent,
    MedicoComponent,
    MedicoDialogoComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    LoginComponent,
    Not403Component,
    ReporteComponent,
    ConsultaComponent,
    Not404Component,
    RegistroComponent,
    ReportepdfComponent
  ],
  providers: [],
})
export class PagesModule { }

