import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_modulo/medico';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

   medicoCambio = new Subject<Medico[]>();
   private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/medicos`
    );
  }

  getMedicoCambio(){
    return this.medicoCambio.asObservable();
  }

  setMedicoCambio(medico: Medico[]){
    return this.medicoCambio.next(medico);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensajeCambio:string){
    this.mensajeCambio.next(mensajeCambio);
  }
}
