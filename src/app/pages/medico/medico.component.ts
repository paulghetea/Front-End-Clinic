import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_modulo/medico';
import { MedicoService } from 'src/app/_services/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit, AfterViewInit {

  firstLastButtons = true;
  id: number;
  origen: MatTableDataSource<Medico>;
  columnasAMostrar: string[] = ['idMedico', 'nombres', 'apellidos', 'cedula', 'fotoUrl','acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private medicoService: MedicoService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {

    this.medicoService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.medicoService.getMedicoCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        this.origen.sort = this.sort;
        this.origen.paginator = this.paginator;
      })
    })


  }
  ngAfterViewInit() {
    this.origen.paginator = this.paginator;
    this.origen.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.origen.filter = filterValue.trim().toLowerCase();

    if (this.origen.paginator) {
      this.origen.paginator.firstPage();
    }
  }

  openDialog(medico?: Medico): void {

    const dialogo1 = this.dialog.open(MedicoDialogoComponent, {
      data: medico
    });

  }

  eliminar(id:number){
    this.medicoService.eliminar(id).subscribe({
      next:() => {
      this.medicoService.listar().subscribe(data=>{
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio("ELIMINADO");
      })
    },

    error:()=>{
      this.snackBar.open("No se puede borrar, médico asociado a una consulta", "cerrar", {duration: 1500});
    }
  })
    this.medicoService.getMensajeCambio().subscribe(mensaje=>{
      this.snackBar.open(mensaje,"cerrar", {duration : 1000})
    })
  }



}

