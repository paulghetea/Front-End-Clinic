import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PacienteComponent } from '../pages/paciente/paciente.component';
import { Paciente } from '../_modulo/paciente';

import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService extends GenericService<Paciente>{

  
  private pacienteCambio= new Subject<Paciente[]>();
  private mensajeCambio= new Subject<string>();

  constructor(protected override http:HttpClient) { 
    super(
      http,`${environment.HOST}/pacientes`
    );
  }

 

  getPacienteCambio(){
    return this.pacienteCambio.asObservable();
  }

  setPacienteCambio(pacientes:Paciente[]){
    this.pacienteCambio.next(pacientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }
}
