import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analitica } from '../_modulo/analitica';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService  extends GenericService<Analitica>{

  private cambio= new Subject<Analitica[]>();
  private mensajeCambio= new Subject<string>();

  constructor(protected override http:HttpClient) {
    super(
      http,`${environment.HOST}/analiticas`
    );
  }

  getCambio(){
    return this.cambio.asObservable();
  }

  setCambio(analiticas:Analitica[]){
    this.cambio.next(analiticas);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }
}
