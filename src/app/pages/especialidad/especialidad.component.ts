import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from 'src/app/_modulo/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit, AfterViewInit {

  id:number;
  especialidades: Especialidad[];
  origen:MatTableDataSource<Especialidad>;
  columnasAMostrar:string[] = ['idEspecialidad', 'nombre', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private especialidadService: EspecialidadService,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {


    this.especialidadService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.especialidadService.getEspecialidadCambio().subscribe(data => {
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
    this.especialidadService.eliminar(id).subscribe({
      next:() => {
      this.especialidadService.listar().subscribe(data=>{
        this.especialidadService.setEspecialidadCambio(data);
        this.especialidadService.setMensajeCambio("ELIMINADO");
      })
    },

    error:()=>{
      this.snackBar.open("No se puede borrar, especialidad asociada a una consulta", "cerrar", {duration: 1500});
    }
  })
    this.especialidadService.getMensajeCambio().subscribe(mensaje=>{
      this.snackBar.open(mensaje,"cerrar", {duration : 1000})
    })
  }

}
