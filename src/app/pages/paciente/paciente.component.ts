import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_modulo/paciente';
import { PacientesService } from 'src/app/_services/pacientes.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit,AfterViewInit {
  id:number;
  pacientes: Paciente[];
  origen:MatTableDataSource<Paciente>;
  columnasAMostrar:string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pacienteService: PacientesService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {


    this.pacienteService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.pacienteService.getPacienteCambio().subscribe(data => {
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
  eliminar(id:number){
    this.pacienteService.eliminar(id).subscribe({
      next:() => {
      this.pacienteService.listar().subscribe(data=>{
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio("ELIMINADO");
      })
    },

    error:()=>{
      this.snackBar.open("No se puede borrar, paciente asociado a una consulta", "cerrar", {duration: 1500});
    }
  })
    this.pacienteService.getMensajeCambio().subscribe(mensaje=>{
      this.snackBar.open(mensaje,"cerrar", {duration : 1000})
    })
  }

}
