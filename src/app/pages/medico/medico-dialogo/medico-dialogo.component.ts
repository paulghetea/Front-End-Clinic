import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medico } from 'src/app/_modulo/medico';
import { MedicoService } from 'src/app/_services/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  modificar:boolean;
  medico:Medico
  todobien:boolean = true;
  todobien2:boolean = true;
  todobien3:boolean = true;
  todobien4:boolean = true;
  general:boolean= true;

  constructor(
    public dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() : void {


    if(this.data != null){
      this.modificar = true;
    }else{
      this.modificar = false;
    }
    this.medico = { ...this.data};
  }

  cancelar() {
    this.dialogRef.close();
  }

  agregar() {

    this.validar()

    if(this.todobien == true && this.todobien2 == true && this.todobien3 == true && this.todobien4 == true){

    if (this.modificar) {

      this.medicoService.modificar(this.medico).subscribe(() => {
        this.medicoService.listar().subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("Se ha modificado");
        });
        this.medicoService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
      });
      this.general = true;
    } else {

      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
        .subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("Se ha registrado");
        })
        this.medicoService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
        this.general = true;
    }
    this.cancelar();
  }
}

  validar(){

    this.general = false;


    if(this.medico.nombres.length >= 3  && this.medico.nombres.length <= 70){
      this.todobien = true;

    }else{
      this.todobien = false;

    }

    if(this.medico.apellidos.length >= 3 && this.medico.apellidos.length <= 70 ){
      this.todobien2 = true;
    }else{
      this.todobien2 = false;
    }

    if(this.medico.cedula.length >= 12 && this.medico.cedula.length <= 12){
      this.todobien3 = true;
    }else{
      this.todobien3 = false;
    }

    if(this.medico.fotoUrl.length >= 3 && this.medico.fotoUrl.length <= 500){
      this.todobien4 = true;
    }else{
      this.todobien4 = false;
    }





  }

}

