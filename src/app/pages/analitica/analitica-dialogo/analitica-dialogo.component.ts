import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Analitica } from 'src/app/_modulo/analitica';
import { AnaliticaService } from 'src/app/_services/analitica.service';

@Component({
  selector: 'app-analitica-dialogo',
  templateUrl: './analitica-dialogo.component.html',
  styleUrls: ['./analitica-dialogo.component.css']
})
export class AnaliticaDialogoComponent implements OnInit {

  modificar:boolean;
  analitica:Analitica;
  todobien:boolean = true;
  todobien2:boolean = true;
  general:boolean= true;

  constructor(
    public dialogRef: MatDialogRef<AnaliticaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Analitica,
    private analiticaService: AnaliticaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() : void {
    if(this.data != null){
      this.modificar = true;
    }else{
      this.modificar = false;
    }
    this.analitica = { ...this.data};
  }

  cancelar() {
    this.dialogRef.close();
  }

  agregar() {
    this.validar()

    if(this.todobien == true && this.todobien2 == true){



    if (this.modificar) {
      this.analiticaService.modificar(this.analitica).subscribe(() => {
        this.analiticaService.listar().subscribe(analitica => {
          this.analiticaService.setCambio(analitica);
          this.analiticaService.setMensajeCambio("Se ha modificado");
        });
        this.analiticaService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
      });
      this.general = true;
    } else {
      this.analiticaService.registrar(this.analitica).pipe(switchMap(() => {
        return this.analiticaService.listar();
      }))
        .subscribe(analitica => {
          this.analiticaService.setCambio(analitica);
          this.analiticaService.setMensajeCambio("Se ha registrado");
        })
        this.analiticaService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
        this.general = true;
    }
    this.cancelar();
  }
  }

  validar(){

    this.general = false;


    if(this.analitica.nombre.length >= 3  && this.analitica.nombre.length <= 50){
      this.todobien = true;
    }else{
      this.todobien = false;
    }

    if(this.analitica.descripcion.length >= 3 && this.analitica.descripcion.length <= 500){
      this.todobien2 = true;
    }else{
      this.todobien2 = false;
    }


  }

  }




